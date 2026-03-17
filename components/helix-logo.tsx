export function HelixLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 4C20 4 8 12 8 20C8 28 20 36 20 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-primary"
      />
      <path
        d="M20 4C20 4 32 12 32 20C32 28 20 36 20 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-primary"
      />
      <circle cx="14" cy="12" r="2" fill="currentColor" className="text-primary" />
      <circle cx="26" cy="12" r="2" fill="currentColor" className="text-primary" />
      <circle cx="12" cy="20" r="2" fill="currentColor" className="text-primary" />
      <circle cx="28" cy="20" r="2" fill="currentColor" className="text-primary" />
      <circle cx="14" cy="28" r="2" fill="currentColor" className="text-primary" />
      <circle cx="26" cy="28" r="2" fill="currentColor" className="text-primary" />
      <line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
    </svg>
  )
}
