import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'

const OUT_DIR = path.join(process.cwd(), 'exported-screens')

test('export phone frames for all screens', async ({ page }) => {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const phone = page.getByTestId('phone-frame')
  const capture = async (filename: string) => {
    await expect(phone).toBeVisible()
    await phone.screenshot({ path: path.join(OUT_DIR, filename) })
  }

  await page.goto('/')

  await capture('01-home.png')

  await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
  await expect(page.getByTestId('clarifier-query-screen')).toBeVisible()
  await capture('02-clarifier-query.png')

  await page.evaluate(() => {
    globalThis.__flowStore?.setState({
      stage: 'CLASSIFYING',
      query: 'lake',
      classifyLock: true,
      cardLoading: false,
    })
  })
  await expect(page.getByTestId('classifying-screen')).toBeVisible()
  await capture('03-classifying.png')
  await page.waitForTimeout(3100)
  await capture('04-classifying-slow.png')

  await page.evaluate(() => {
    globalThis.__flowStore?.setState({
      stage: 'SEARCHING',
      query: 'lake',
      cardLoading: false,
    })
  })
  await capture('05-searching.png')

  await page.goto('/')
  await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
  await page.getByTestId('query-input').fill('lake')
  await page.getByTestId('query-submit').click()
  await expect(page.getByText('When was the photo clicked?')).toBeVisible({ timeout: 25_000 })
  await capture('06-clarifier-questions.png')

  await page.getByRole('button', { name: 'Last week' }).click()
  await capture('07-clarifier-with-selection.png')

  await page.getByRole('button', { name: 'Skip' }).click()
  await expect(page.getByRole('heading', { name: /photos match/i })).toBeVisible({
    timeout: 15_000,
  })
  await capture('08-results.png')

  await page.evaluate(() => {
    globalThis.__flowStore?.setState({
      stage: 'FALLBACK',
      cardLoading: false,
      currentQuestion: null,
      loopBanner: null,
    })
  })
  await capture('11-fallback.png')

  await page.goto('/')
  await page.getByRole('button', { name: /Can't remember the photo clearly/i }).click()
  await page.getByTestId('query-input').fill('lake')
  await page.getByTestId('query-submit').click()
  await expect(page.getByText('When was the photo clicked?')).toBeVisible({ timeout: 25_000 })
  await page.evaluate(() => {
    globalThis.__flowStore?.setState({
      stage: 'LOOPBACK',
      loopBanner: "Let's narrow it down differently.",
      cardLoading: false,
    })
  })
  await expect(page.getByTestId('loop-back-banner')).toBeVisible()
  await capture('12-loopback.png')

  await page.evaluate(() => {
    globalThis.__flowStore?.setState({
      stage: 'LEVEL2',
      cardLoading: true,
      roundQuestions: [],
    })
  })
  await page.waitForTimeout(200)
  await capture('13-clarifier-loading.png')
})
