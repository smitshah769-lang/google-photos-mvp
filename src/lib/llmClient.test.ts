import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CALL1_TIMEOUT_MS } from '@/config'
import { bumpSessionGeneration, classify } from '@/lib/llmClient'

describe('llmClient', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_USE_MOCK_LLM', 'false')
    bumpSessionGeneration()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('falls back on invalid JSON from proxy (E-10.4)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ ok: false, error: 'Invalid output' }),
      }),
    )

    const result = await classify('lake')
    expect(result?.fallback).toBe(true)
    expect(result?.data.class).toBe('nonPeople')
  })

  it('uses fallback after Call 1 timeout (E-10.12)', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise(() => {
            /* never resolves */
          }),
      ),
    )

    const pending = classify('friends')
    await vi.advanceTimersByTimeAsync(CALL1_TIMEOUT_MS)
    const result = await pending
    expect(result?.fallback).toBe(true)
    expect(result?.data.class).toBe('people')
    vi.useRealTimers()
  })

  it('ignores stale classify responses after reset (E-10.7)', async () => {
    let releaseFirst: (() => void) | undefined
    const firstFetchGate = new Promise<void>((resolve) => {
      releaseFirst = resolve
    })
    let call = 0

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        call++
        if (call === 1) {
          await firstFetchGate
          return {
            ok: true,
            json: async () => ({
              ok: true,
              data: {
                class: 'text',
                extracted: { objects: [], animals: [] },
              },
              meta: { latencyMs: 50 },
            }),
          }
        }
        return {
          ok: true,
          json: async () => ({
            ok: true,
            data: {
              class: 'people',
              extracted: { objects: [], animals: [] },
            },
            meta: { latencyMs: 5 },
          }),
        }
      }),
    )

    const first = classify('lake')
    bumpSessionGeneration()
    await classify('friends')
    releaseFirst!()
    const firstResult = await first
    expect(firstResult).toBeNull()
  })

  it('mock fixtures match demo script', async () => {
    vi.stubEnv('VITE_USE_MOCK_LLM', 'true')
    const cases: Array<[string, string]> = [
      ['lake', 'nonPeople'],
      ['me at the beach', 'both'],
      ['friends', 'people'],
      ['hotel receipt', 'text'],
      ['dog', 'people'],
    ]
    for (const [query, cls] of cases) {
      const r = await classify(query)
      expect(r?.data.class).toBe(cls)
    }
  })
})
