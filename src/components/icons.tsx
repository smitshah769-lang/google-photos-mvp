type IconProps = { className?: string }

function iconClass(base: string, className?: string): string {
  return className ? `${base} ${className}` : base
}

export function ChevronBackIcon({ className }: IconProps) {
  return (
    <svg className={iconClass('h-6 w-6 shrink-0', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={iconClass('h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function SparkleSearchIcon({ className }: IconProps) {
  return (
    <svg className={iconClass('h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16.5 16.5L20 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M18 4l.6 1.4L20 6l-1.4.6L18 8l-.6-1.4L16 6l1.4-.6L18 4z"
        fill="currentColor"
      />
    </svg>
  )
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg className={iconClass('h-[18px] w-[18px] shrink-0', className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={iconClass('h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16.5 16.5L20 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg className={iconClass('h-5 w-5 shrink-0', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12l16-7-7 16-2-7-7-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}
