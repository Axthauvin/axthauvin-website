import React, { useEffect, useState } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}: DialogProps) {
  const [visible, setVisible] = useState(false);

  // Handle animation timing
  useEffect(() => {
    if (isOpen) setVisible(true);
    else setTimeout(() => setVisible(false), 200); // Wait for exit animation
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="relative z-50">
      {/* Backdrop / Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-200
          ${isOpen ? "animate-in fade-in-0" : "animate-out fade-out-0"}`}
        onClick={onClose}
      />

      {/* Dialog Content */}
      <div
        className={`fixed left-[50%] top-[50%] z-50 grid w-full max-w-md md:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-800 bg-zinc-950 p-6 shadow-2xl duration-200 sm:rounded-lg
        ${
          isOpen
            ? "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]"
            : "animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]"
        }`}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight text-zinc-50">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-zinc-400">{description}</p>
          )}
        </div>

        {/* Custom Body Content */}
        {children && <div className="py-2 text-zinc-300">{children}</div>}

        {/* Footer / Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          {footer}
        </div>

        {/* Close "X" Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-800 text-zinc-400 hover:text-zinc-50"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}

// Simple SVG Icon component to avoid lucide-react dependency if you don't have it
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
