import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Called on ArrowLeft */
  onPrev?: () => void;
  /** Called on ArrowRight */
  onNext?: () => void;
  closeLabel: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, onPrev, onNext, closeLabel, labelledBy, className, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const handlers = useRef({ onClose, onPrev, onNext });

  useLayoutEffect(() => {
    handlers.current = { onClose, onPrev, onNext };
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlers.current.onClose();
      else if (e.key === "ArrowLeft") handlers.current.onPrev?.();
      else if (e.key === "ArrowRight") handlers.current.onNext?.();
      else if (e.key === "Tab" && panelRef.current) {
        // simple focus trap
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 30);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className="absolute inset-0 animate-fade-in bg-slate-950/75 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        className={cn(
          "relative max-h-[94svh] w-full animate-fade-up overflow-y-auto overscroll-contain rounded-t-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:max-h-[90vh] sm:rounded-3xl dark:bg-ink-900 dark:ring-white/10",
          className,
        )}
      >
        {/* zero-height sticky bar keeps the close button visible while the content scrolls */}
        <div className="sticky top-0 z-20 flex h-0 justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="mr-3 mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md ring-1 ring-slate-200 backdrop-blur transition hover:rotate-90 hover:text-slate-950 dark:bg-ink-800/90 dark:text-slate-200 dark:ring-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
