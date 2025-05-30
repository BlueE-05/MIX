'use client'

interface ArrowRightButtonProps {
  onClick?: () => void;
  color?: string;
}

export default function ArrowRightButton({ onClick, color = "text-gray-500" }: ArrowRightButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`text-${color}-500  transition-colors`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  );
}