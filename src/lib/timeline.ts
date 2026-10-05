import { REFERENCE_DATE } from '@/config'

export type TimelineValue =
  | 'last_week'
  | 'last_month'
  | 'last_3_months'
  | 'this_year'
  | 'last_year'
  | 'older'
  | `year:${number}`

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function formatIso(d: Date): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(iso: string, days: number): string {
  const d = parseIsoDate(iso)
  d.setUTCDate(d.getUTCDate() + days)
  return formatIso(d)
}

function addMonths(iso: string, months: number): string {
  const d = parseIsoDate(iso)
  d.setUTCMonth(d.getUTCMonth() + months)
  return formatIso(d)
}

/** Inclusive range check on ISO date strings. */
export function isDateInRange(date: string, start: string, end: string): boolean {
  return date >= start && date <= end
}

export function lastWeekRange(referenceDate = REFERENCE_DATE): { start: string; end: string } {
  const start = addDays(referenceDate, -7)
  return { start, end: referenceDate }
}

export function lastMonthRange(referenceDate = REFERENCE_DATE): { start: string; end: string } {
  const start = addDays(referenceDate, -30)
  return { start, end: referenceDate }
}

export function last3MonthsRange(referenceDate = REFERENCE_DATE): { start: string; end: string } {
  const start = addDays(referenceDate, -90)
  return { start, end: referenceDate }
}

export function thisYearPrimaryRange(referenceDate = REFERENCE_DATE): {
  start: string
  end: string
} {
  const year = parseIsoDate(referenceDate).getUTCFullYear()
  return { start: `${year}-01-01`, end: referenceDate }
}

export function calendarYearRange(year: number): { start: string; end: string } {
  return { start: `${year}-01-01`, end: `${year}-12-31` }
}

/** Strictly before the last 12 months from reference (E-6.6). */
export function olderCutoff(referenceDate = REFERENCE_DATE): string {
  return addMonths(referenceDate, -12)
}

export function parseTimelineValue(value: string): TimelineValue | null {
  if (
    value === 'last_week' ||
    value === 'last_month' ||
    value === 'last_3_months' ||
    value === 'this_year' ||
    value === 'last_year' ||
    value === 'older'
  ) {
    return value
  }
  const yearMatch = /^year:(\d{4})$/.exec(value)
  if (yearMatch) return `year:${Number(yearMatch[1])}` as TimelineValue
  return null
}

/** Ranges that count as a match for the timeline profile value (includes ±1 year crawl where required). */
export function timelineMatchRanges(
  timelineValue: string,
  referenceDate = REFERENCE_DATE,
): Array<{ start: string; end: string }> {
  const parsed = parseTimelineValue(timelineValue)
  if (!parsed) return []

  switch (parsed) {
    case 'last_week':
      return [lastWeekRange(referenceDate)]
    case 'last_month':
      return [lastMonthRange(referenceDate)]
    case 'last_3_months':
      return [last3MonthsRange(referenceDate)]
    case 'older': {
      const cutoff = olderCutoff(referenceDate)
      return [{ start: '0000-01-01', end: addDays(cutoff, -1) }]
    }
    case 'this_year': {
      const y = parseIsoDate(referenceDate).getUTCFullYear()
      return [
        thisYearPrimaryRange(referenceDate),
        calendarYearRange(y - 1),
        calendarYearRange(y + 1),
      ]
    }
    case 'last_year': {
      const y = parseIsoDate(referenceDate).getUTCFullYear() - 1
      return [calendarYearRange(y), calendarYearRange(y - 1), calendarYearRange(y + 1)]
    }
    default: {
      if (parsed.startsWith('year:')) {
        const y = Number(parsed.slice(5))
        return [calendarYearRange(y), calendarYearRange(y - 1), calendarYearRange(y + 1)]
      }
      return []
    }
  }
}

export function photoMatchesTimeline(
  photoDate: string,
  timelineValue: string,
  referenceDate = REFERENCE_DATE,
): boolean {
  const ranges = timelineMatchRanges(timelineValue, referenceDate)
  return ranges.some((r) => isDateInRange(photoDate, r.start, r.end))
}

/** Helper copy for year crawl UI (E-6.5, FR-4). */
export function yearCrawlHelperText(timelineValue: string, referenceDate = REFERENCE_DATE): string | null {
  const parsed = parseTimelineValue(timelineValue)
  if (!parsed) return null

  let y: number | null = null
  if (parsed === 'this_year') {
    y = parseIsoDate(referenceDate).getUTCFullYear()
  } else if (parsed === 'last_year') {
    y = parseIsoDate(referenceDate).getUTCFullYear() - 1
  } else if (parsed.startsWith('year:')) {
    y = Number(parsed.slice(5))
  }

  if (y === null) return null
  return `Also checking ${y - 1} and ${y + 1}`
}
