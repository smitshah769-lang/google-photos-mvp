import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Photo } from '@/data/photos'
import type { Attr } from '@/lib/attributes'
import { bumpSessionGeneration, invalidateQuestionCache } from '@/lib/llmClient'
import { pickLoopBackLevel } from '@/lib/questionPicker'
import { photos } from '@/data/photos'
import { createFlowStore } from '@/state/flowStore'

function photo(id: string, extra: Partial<Photo> = {}): Photo {
  return {
    id,
    kind: 'photo',
    source: 'generated',
    src: null,
    alt: id,
    width: 1,
    height: 1,
    date: '2026-10-01',
    location: 'Alpha',
    setting: 'outdoor',
    hasPeople: false,
    peopleCount: 0,
    animals: [],
    objects: ['lake'],
    colors: ['blue'],
    ...extra,
  }
}

function lakeSet(count: number, locationFor: (index: number) => string): Photo[] {
  return Array.from({ length: count }, (_, index) =>
    photo(`l${index}`, { location: locationFor(index) }),
  )
}

function beachLadder(count: number): Photo[] {
  return Array.from({ length: count }, (_, index) => {
    const even = index % 2 === 0
    return photo(`b${index}`, {
      objects: ['beach', even ? 'boat' : 'tree'],
      location: even ? 'Alpha' : 'Beta',
      hasPeople: true,
      peopleCount: even ? 1 : 2,
      photoType: even ? 'selfie' : 'candid',
      timeOfDay: even ? 'morning' : 'night',
      pose: even ? 'smiling' : 'serious',
      setting: even ? 'indoor' : 'outdoor',
      alt: `scene ${index}`,
    })
  })
}

function bothLadder(count: number): Photo[] {
  return beachLadder(count).map((item, index) => ({
    ...item,
    objects: ['dog', index % 2 === 0 ? 'boat' : 'tree'],
    animals: ['dog'],
  }))
}

async function cantRememberRound(store: ReturnType<typeof createFlowStore>) {
  for (const question of store.getState().roundQuestions) {
    store.getState().roundCantRemember(question.attr)
  }
  await store.getState().submitRound()
}

beforeEach(() => {
  vi.stubEnv('VITE_USE_MOCK_LLM', 'true')
  bumpSessionGeneration()
  invalidateQuestionCache()
})

describe('flowStore', () => {
  it('stops at 12 and keeps asking at 13 (E-7.3, E-7.4)', async () => {
    const early = createFlowStore(lakeSet(12, () => 'Alpha'))
    await early.getState().submitQuery('lake')
    expect(early.getState().stage).toBe('RESULTS')
    expect(early.getState().candidates).toHaveLength(12)

    const cont = createFlowStore(
      lakeSet(13, (index) => (index === 0 ? 'Beta' : 'Alpha')),
    )
    await cont.getState().submitQuery('lake')
    expect(cont.getState().stage).toBe('LEVEL1')
    expect(cont.getState().candidates).toHaveLength(13)
    expect(cont.getState().roundQuestions.some((q) => q.attr === 'timeline')).toBe(true)

    cont.getState().roundCantRemember('timeline')
    await cont.getState().submitRound()
    expect(cont.getState().stage).toBe('LEVEL1')
    expect(cont.getState().candidates).toHaveLength(13)
    expect(cont.getState().answered.timeline).toBe('any')

    cont.getState().toggleRoundOption('location', 'Alpha')
    await cont.getState().submitRound()
    expect(cont.getState().stage).toBe('RESULTS')
    expect(cont.getState().candidates).toHaveLength(12)
  })

  it('notFound from clarifier when >12 candidates starts loop-back (FR-12)', async () => {
    const store = createFlowStore(
      lakeSet(13, (index) => (index === 0 ? 'Beta' : 'Alpha')),
    )
    await store.getState().submitQuery('lake')
    expect(store.getState().stage).toBe('LEVEL1')
    expect(store.getState().candidates.length).toBeGreaterThan(12)

    await store.getState().notFound()
    expect(store.getState().stage).not.toBe('LEVEL1')
    expect(store.getState().candidates.length).toBeGreaterThan(12)
  })

  it('all-can’t-remember round escalates to deeper probing instead of stopping at the L2 cap (E-7.9)', async () => {
    const store = createFlowStore(bothLadder(20))
    await store.getState().submitQuery('me and my dog')
    while (store.getState().level === 1) await cantRememberRound(store)
    expect(store.getState().level).toBe(2)
    await cantRememberRound(store)
    expect(store.getState().stage).not.toBe('RESULTS')
    expect(store.getState().level).toBe(3)
    expect(store.getState().questionsThisRound).toBe(0)
    expect(store.getState().roundQuestions.length).toBeGreaterThan(0)
    expect(store.getState().candidates.length).toBeGreaterThan(12)
    expect(store.getState().candidates.length).toBeLessThanOrEqual(30)
  })

  it('back steps clarifier → home with query (profile cleared) (E-1.8, E-12.2)', async () => {
    const store = createFlowStore(lakeSet(13, (index) => (index === 0 ? 'Beta' : 'Alpha')))
    await store.getState().submitQuery('lake')
    expect(store.getState().roundQuestions.length).toBeGreaterThan(0)
    store.getState().back()
    expect(store.getState().stage).toBe('HOME')
    expect(store.getState().query).toBe('lake')
    expect(store.getState().profile).toEqual({})
    expect(store.getState().queryClass).toBeNull()
    expect(store.getState().candidateHistory).toEqual([])
  })

  it('covers first-level rounds then a contextual round (E-7.7)', async () => {
    const store = createFlowStore(bothLadder(31))
    await store.getState().submitQuery('me and my dog')

    const firstLevel: Attr[] = []
    expect(store.getState().queryClass).toBe('both')
    while (store.getState().level === 1 && store.getState().stage === 'LEVEL1') {
      firstLevel.push(...store.getState().roundQuestions.map((q) => q.attr))
      expect(store.getState().questionsThisRound).toBe(0)
      await cantRememberRound(store)
    }

    const coarse = new Set<Attr>([
      'timeline',
      'location',
      'object',
      'photoType',
      'peopleCount',
      'timeOfDay',
    ])
    expect(firstLevel.every((a) => coarse.has(a))).toBe(true)
    expect(firstLevel.length).toBeGreaterThan(0)
    expect(store.getState().level).toBe(2)

    const contextual: Attr[] = []
    while (store.getState().stage !== 'RESULTS') {
      contextual.push(...store.getState().roundQuestions.map((q) => q.attr))
      await cantRememberRound(store)
    }

    const contextualPool = new Set<Attr>([
      'peopleCount',
      'timeOfDay',
      'background',
      'pose',
      'photoType',
      'object',
      'timeline',
      'location',
    ])
    expect(contextual.slice(0, 3).every((a) => contextualPool.has(a))).toBe(true)
    expect(new Set(contextual.slice(0, 3)).size).toBe(3)
    expect(contextual.length).toBeGreaterThan(3)
    expect(store.getState().questionsThisRound).toBe(0)
    expect(store.getState().level).toBe(3)
    expect(store.getState().candidates.length).toBeGreaterThan(12)
    expect(store.getState().stage).toBe('RESULTS')
  })

  it('falls back on the second not-found and debounces a double tap (E-9.5, E-9.6)', async () => {
    const store = createFlowStore(beachLadder(31))
    await store.getState().submitQuery('me at the beach')
    store.getState().showResultsNow()
    expect(store.getState().stage).toBe('RESULTS')
    expect(store.getState().loopCount).toBe(0)

    const first = store.getState().notFound()
    void store.getState().notFound()
    await first
    expect(store.getState().loopCount).toBe(1)
    expect(['LOOPBACK', 'LEVEL2', 'LEVEL3']).toContain(store.getState().stage)
    expect(store.getState().loopBanner).toMatch(/narrow it down differently/i)

    store.getState().showResultsNow()
    await store.getState().notFound()
    expect(store.getState().stage).toBe('FALLBACK')
    expect(store.getState().loopCount).toBe(1)

    store.getState().startOver()
    expect(store.getState().stage).toBe('HOME')
    expect(store.getState().loopCount).toBe(0)
    expect(store.getState().profile).toEqual({})
    expect(store.getState().query).toBe('')
  })

  it('grass with one baseline hit asks clarifier questions instead of skipping to results', async () => {
    const store = createFlowStore(photos)
    await store.getState().submitQuery('grass')
    expect(store.getState().stage).toMatch(/LEVEL/)
    expect(store.getState().roundQuestions.length).toBeGreaterThan(0)
  })

  it('loop-back from a single grass result asks questions instead of fallback', async () => {
    const store = createFlowStore(photos)
    await store.getState().submitQuery('grass')
    store.getState().showResultsNow()
    expect(store.getState().stage).toBe('RESULTS')

    await store.getState().notFound()
    expect(store.getState().stage).not.toBe('FALLBACK')
    expect(store.getState().loopCount).toBe(1)
    expect(store.getState().roundQuestions.length).toBeGreaterThan(0)
  })

  it('loop-back does not re-ask L2 attributes already answered (E-9.7)', async () => {
    const store = createFlowStore(beachLadder(31))
    await store.getState().submitQuery('me at the beach')

    while (store.getState().level === 1 && store.getState().stage === 'LEVEL1') {
      await cantRememberRound(store)
    }

    const answeredL2 = new Set<Attr>()
    expect(store.getState().level).toBe(2)
    for (const q of store.getState().roundQuestions) answeredL2.add(q.attr)
    await cantRememberRound(store)
    expect(answeredL2.size).toBeGreaterThan(0)

    store.getState().showResultsNow()
    expect(store.getState().stage).toBe('RESULTS')
    expect(store.getState().answered).toMatchObject({
      peopleCount: 'any',
      timeOfDay: 'any',
    })
    expect(
      pickLoopBackLevel(
        store.getState().candidates,
        store.getState().answered,
        store.getState().queryClass!,
      ),
    ).toBe(3)

    await store.getState().notFound()
    expect(store.getState().loopBanner).toMatch(/narrow it down differently/i)
    expect(store.getState().level).toBe(3)
    const loopAttrs = store.getState().roundQuestions.map((q) => q.attr)
    expect(loopAttrs.length).toBeGreaterThan(0)
    for (const attr of answeredL2) {
      expect(loopAttrs).not.toContain(attr)
    }
  })

  it('loop-back asks a new question round from results (including when count ≤ early-stop)', async () => {
    const store = createFlowStore(beachLadder(31))
    await store.getState().submitQuery('me at the beach')
    store.getState().showResultsNow()
    expect(store.getState().stage).toBe('RESULTS')

    await store.getState().notFound()
    expect(store.getState().loopCount).toBe(1)
    expect(store.getState().loopBanner).toMatch(/narrow it down differently/i)
    expect(store.getState().roundQuestions.length).toBeGreaterThan(0)
    expect(['LEVEL2', 'LEVEL3', 'LOOPBACK']).toContain(store.getState().stage)
  })

  it('relaxes Location on a Whistler-sized set (E-9.1)', async () => {
    const library = [
      ...Array.from({ length: 6 }, (_, index) =>
        photo(`vi${index}`, {
          location: 'Vancouver Island',
          timeOfDay: index % 2 === 0 ? 'morning' : 'afternoon',
        }),
      ),
      ...Array.from({ length: 6 }, (_, index) =>
        photo(`ba${index}`, {
          location: 'Banff',
          timeOfDay: index % 2 === 0 ? 'morning' : 'afternoon',
        }),
      ),
      photo('w0', { location: 'Whistler', timeOfDay: 'morning' }),
      photo('w1', { location: 'Whistler', timeOfDay: 'afternoon' }),
    ]
    const store = createFlowStore(library)
    await store.getState().submitQuery('lake')

    const answerTimelineAndWhistler = () => {
      for (const q of store.getState().roundQuestions) {
        if (q.attr === 'timeline') store.getState().toggleRoundOption('timeline', 'last_week')
        if (q.attr === 'location') store.getState().toggleRoundOption('location', 'Whistler')
      }
    }
    answerTimelineAndWhistler()
    await store.getState().submitRound()
    while (store.getState().stage !== 'RESULTS' && store.getState().roundQuestions.length > 0) {
      answerTimelineAndWhistler()
      await store.getState().submitRound()
    }
    expect(store.getState().stage).toBe('RESULTS')
    expect(store.getState().candidates.map((item) => item.id).sort()).toEqual(['w0', 'w1'])

    await store.getState().notFound()
    expect(store.getState().relaxed).toContain('location')
    expect(store.getState().profile.location).toBeUndefined()
    expect(store.getState().profile.timeline).toBe('last_week')
    expect(store.getState().candidates).toHaveLength(14)
    expect(store.getState().roundQuestions.some((q) => q.attr === 'timeOfDay')).toBe(true)
    expect(store.getState().loopCount).toBe(1)
  })

  it('a pet query stays people and does not require hasPeople', async () => {
    const pet = photo('pet', {
      animals: ['dog'],
      hasPeople: false,
      peopleCount: 0,
      objects: ['dog'],
      alt: 'small dog',
    })
    const other = photo('other', {
      objects: ['mountain'],
      hasPeople: true,
      peopleCount: 2,
      photoType: 'selfie',
      alt: 'hikers',
    })
    const store = createFlowStore([pet, other])
    await store.getState().submitQuery('dog')

    const state = store.getState()
    expect(state.queryClass).toBe('people')
    expect(state.profile.peopleCount).toBeUndefined()
    expect(state.profile.photoType).toBeUndefined()
    expect(state.keywords).toContain('dog')
    expect(state.candidates.map((item) => item.id)).toContain('pet')
    expect(state.candidates.every((item) => item.id !== 'other')).toBe(true)
    expect(state.candidates.find((item) => item.id === 'pet')?.hasPeople).toBe(false)
  })

  it('ignores an empty query and a second submit while classifying (E-1.1, E-1.7)', async () => {
    const store = createFlowStore(lakeSet(13, () => 'Alpha'))
    await store.getState().submitQuery('   ')
    expect(store.getState().stage).toBe('HOME')

    let release: (() => void) | undefined
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const original = globalThis.fetch
    vi.stubEnv('VITE_USE_MOCK_LLM', 'false')
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            void gate.then(() =>
              resolve({
                ok: true,
                json: async () => ({
                  ok: true,
                  data: { class: 'nonPeople', extracted: { objects: [], animals: [] } },
                  meta: { latencyMs: 1 },
                }),
              }),
            )
          }),
      ),
    )

    const live = createFlowStore(lakeSet(13, () => 'Alpha'))
    const pending = live.getState().submitQuery('lake')
    expect(live.getState().stage).toBe('CLASSIFYING')
    await live.getState().submitQuery('lake again')
    expect(live.getState().query).toBe('lake')
    release?.()
    await pending
    vi.stubGlobal('fetch', original)
  })

})
