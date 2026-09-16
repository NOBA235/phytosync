export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* soil strata */}
      <rect x="2" y="18" width="24" height="3.2" rx="1.2" fill="#1B3320" />
      <rect x="4" y="22.4" width="20" height="3.2" rx="1.2" fill="#2D5432" />
      {/* root / growth line */}
      <path
        d="M14 18V9.5"
        stroke="#3F6B43"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14 14.5L10.5 12"
        stroke="#5E8961"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M14 16.2L17.2 14"
        stroke="#5E8961"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* sprout */}
      <path
        d="M14 9.5C14 9.5 9.5 9.7 9.5 5.3C13.9 5.3 14 9.5 14 9.5Z"
        fill="#5E8961"
      />
      <path
        d="M14 9.5C14 9.5 18.2 9.9 18.2 5.6C13.9 5.6 14 9.5 14 9.5Z"
        fill="#8FB090"
      />
    </svg>
  );
}
