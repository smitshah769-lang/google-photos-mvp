import { expect, test, type Page } from '@playwright/test'

async function openQueryWithLake(page: Page) {
  await page.goto('/')
  await expect(page.getByTestId('home-faces-row')).toBeVisible()
  await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
  await expect(page.getByTestId('clarifier-query-screen')).toBeVisible()
  await expect(page.getByTestId('home-faces-row')).toHaveCount(0)
  await expect(page.getByTestId('home-recents-list')).toHaveCount(0)
  await page.getByTestId('query-input').fill('lake')
  await page.getByTestId('query-submit').click()
  await expect(page.getByText('When was the photo clicked?')).toBeVisible({ timeout: 20_000 })
}

async function submitRound(page: Page) {
  await page.getByTestId('submit-round').click()
}

/** Advance through level-1 rounds until contextual (Show N photos) or results. */
async function continueUntilShowPhotosOrResults(page: Page) {
  for (let i = 0; i < 6; i++) {
    if (await page.getByRole('heading', { name: /photos match/i }).isVisible().catch(() => false)) {
      return
    }
    if (await page.getByTestId('match-count').isVisible().catch(() => false)) {
      return
    }
    const btn = page.getByTestId('submit-round')
    if (!(await btn.isVisible().catch(() => false))) return
    await btn.click()
    await page.waitForTimeout(400)
  }
}

test.describe('Demo paths (mock LLM)', () => {
  test('Path A — lake, last week, typed lily pads → single result', async ({ page }) => {
    await openQueryWithLake(page)
    await page.getByRole('button', { name: 'Last week' }).click()
    await submitRound(page)
    await continueUntilShowPhotosOrResults(page)

    await page.getByRole('button', { name: '✎ Add detail' }).first().click()
    await page.getByTestId('typed-answer-input').fill('the island, with lily pads')
    await page.getByRole('button', { name: 'Send typed answer' }).click()

    await submitRound(page)

    await expect(page.getByRole('heading', { name: /1 photo match/i })).toBeVisible({
      timeout: 25_000,
    })
    await expect(page.getByText(/Without clarifier:/i)).toBeVisible()
  })

  test('Path B — Whistler loop-back then morning question', async ({ page }) => {
    await openQueryWithLake(page)
    await page.getByRole('button', { name: 'Last week' }).click()
    await page.getByRole('button', { name: 'Whistler' }).click()
    await continueUntilShowPhotosOrResults(page)
    await submitRound(page)

    await expect(page.getByRole('heading', { name: /2 photos match/i })).toBeVisible({
      timeout: 20_000,
    })
    await page.getByRole('button', { name: /I did not find the photo/i }).click()

    await expect(page.getByTestId('loop-back-banner')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText(/time of day/i)).toBeVisible({ timeout: 20_000 })
  })

  test('Path C — me at the beach extracts beach (both class, early stop ≤12)', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
    await page.getByTestId('query-input').fill('me at the beach')
    await page.getByTestId('query-submit').click()
    await expect(page.getByRole('heading', { name: /photos match/i })).toBeVisible({
      timeout: 20_000,
    })
    await expect(page.getByText('Beach', { exact: true }).first()).toBeVisible()
  })

  test('Path C — friends classifies as people', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
    await page.getByTestId('query-input').fill('friends')
    await page.getByTestId('query-submit').click()
    await expect(page.getByRole('heading', { name: /2 photos match/i })).toBeVisible({
      timeout: 20_000,
    })
  })

  test('Path C — hotel receipt pre-fills doc type (early stop when ≤12)', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
    await page.getByTestId('query-input').fill('hotel receipt')
    await page.getByTestId('query-submit').click()
    await expect(page.getByRole('heading', { name: /photos match/i })).toBeVisible({
      timeout: 20_000,
    })
    await expect(page.getByText('Receipt').first()).toBeVisible()
  })

  test('Acceptance 18 — no horizontal document scroll', async ({ page }) => {
    await page.goto('/')
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement
      return doc.scrollWidth > doc.clientWidth
    })
    expect(overflow).toBe(false)
  })
})
