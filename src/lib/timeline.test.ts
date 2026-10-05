import { describe, expect, it } from 'vitest'
import {
  isDateInRange,
  lastWeekRange,
  lastMonthRange,
  olderCutoff,
  photoMatchesTimeline,
  yearCrawlHelperText,
} from '@/lib/timeline'

const REF = '2026-10-05'

describe('timeline (E-6.1–E-6.5)', () => {
  it('last week includes seven days before reference and reference date (implementation plan §3)', () => {
    const { start, end } = lastWeekRange(REF)
    expect(start).toBe('2026-09-28')
    expect(end).toBe(REF)
    expect(isDateInRange('2026-09-28', start, end)).toBe(true)
    expect(isDateInRange('2026-10-05', start, end)).toBe(true)
    expect(isDateInRange('2026-09-27', start, end)).toBe(false)
  })

  it('last month is 30 days before reference through reference date (E-6.2)', () => {
    const { start, end } = lastMonthRange(REF)
    expect(end).toBe(REF)
    expect(start).toBe('2026-09-05')
    expect(photoMatchesTimeline('2026-09-28', 'last_week', REF)).toBe(true)
    expect(photoMatchesTimeline('2026-09-28', 'last_month', REF)).toBe(true)
  })

  it('this year and year pick apply ±1 year crawl (E-6.5)', () => {
    expect(photoMatchesTimeline('2025-06-01', 'this_year', REF)).toBe(true)
    expect(photoMatchesTimeline('2027-03-01', 'this_year', REF)).toBe(true)
    expect(photoMatchesTimeline('2024-06-01', 'this_year', REF)).toBe(false)

    expect(photoMatchesTimeline('2024-01-01', 'last_year', REF)).toBe(true)
    expect(photoMatchesTimeline('2026-08-01', 'last_year', REF)).toBe(true)

    expect(yearCrawlHelperText('this_year', REF)).toBe('Also checking 2025 and 2027')
    expect(yearCrawlHelperText('year:2023', REF)).toBe('Also checking 2022 and 2024')
  })

  it('older is strictly before last 12 months (E-6.6)', () => {
    const cutoff = olderCutoff(REF)
    expect(cutoff).toBe('2025-10-05')
    expect(photoMatchesTimeline('2025-10-04', 'older', REF)).toBe(true)
    expect(photoMatchesTimeline('2025-10-05', 'older', REF)).toBe(false)
  })
})
