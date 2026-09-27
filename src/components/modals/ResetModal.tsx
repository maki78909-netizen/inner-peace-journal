import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#d6ded7] z-10 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-[#fdf2f2] text-[#c53030] flex items-center justify-center mx-auto mb-4 border border-[#fbd5d5]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1f332a] mb-2">
          Reset Your Journal?
        </h3>

        <p className="text-sm text-[#546b5f] leading-relaxed mb-6 font-sans">
          Are you sure you want to erase your journal? All your written reflections,
          completed days, check-ins, and scorecard data will be permanently cleared.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-[#d0ded2] text-sm font-semibold text-[#294436] hover:bg-[#f1f6f2] transition-colors cursor-pointer min-h-[46px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-[#b92b27] text-white text-sm font-semibold hover:bg-[#a0221f] transition-colors shadow-sm cursor-pointer min-h-[46px]"
          >
            Reset Everything
          </button>
        </div>
      </div>
    </div>
  );
};
