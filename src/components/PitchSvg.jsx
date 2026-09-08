export default function PitchSvg({ pitchType = 'full' }) {
  if (pitchType === 'half') {
    return (
      <svg
        className="w-full h-full text-emerald-800/40 stroke-current pointer-events-none"
        viewBox="0 0 100 65"
        fill="none"
        strokeWidth="0.8"
      >
        <rect x="2" y="2" width="96" height="61" rx="1" />
        <line x1="2" y1="63" x2="98" y2="63" strokeWidth="1.2" />
        <path d="M 38 63 A 12 12 0 0 1 62 63" />
        <circle cx="50" cy="63" r="0.8" fill="currentColor" />
        <rect x="24" y="2" width="52" height="20" />
        <rect x="36" y="2" width="28" height="7" />
        <circle cx="50" cy="16" r="0.8" fill="currentColor" />
        <path d="M 38 22 A 12 12 0 0 0 62 22" />
        <rect x="42" y="0.5" width="16" height="1.5" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg
      className="w-full h-full text-emerald-800/40 stroke-current pointer-events-none"
      viewBox="0 0 100 65"
      fill="none"
      strokeWidth="0.8"
    >
      <rect x="2" y="2" width="96" height="61" rx="1" />
      <line x1="50" y1="2" x2="50" y2="63" />
      <circle cx="50" cy="32.5" r="9" />
      <circle cx="50" cy="32.5" r="0.8" fill="currentColor" />
      <rect x="2" y="16.25" width="13.2" height="32.5" />
      <rect x="2" y="24.375" width="4.4" height="16.25" />
      <rect x="84.8" y="16.25" width="13.2" height="32.5" />
      <rect x="93.6" y="24.375" width="4.4" height="16.25" />
    </svg>
  );
}