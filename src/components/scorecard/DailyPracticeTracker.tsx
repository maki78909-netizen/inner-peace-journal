import React from 'react';
import { TrackerCellState } from '../../types/journal';
import { PRACTICE_CATEGORIES } from '../../utils/defaultData';

interface DailyPracticeTrackerProps {
  practiceGrid: Record<string, TrackerCellState[]>;
  onChange: (grid: Record<string, TrackerCellState[]>) => void;
}

export const DailyPracticeTracker: React.FC<DailyPracticeTrackerProps> = ({
  practiceGrid,
  onChange,
}) => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  const cycleCell = (category: string, dayIndex: number) => {
    const current = practiceGrid[category]?.[dayIndex] ?? 0;
    const next: TrackerCellState = current === 0 ? 1 : current === 1 ? 2 : 0;
    const updatedRow: TrackerCellState[] = [
      ...(practiceGrid[category] || new Array<TrackerCellState>(21).fill(0 as TrackerCellState)),
    ];
    updatedRow[dayIndex] = next;

    onChange({
      ...practiceGrid,
      [category]: updatedRow,
    });
  };

  // Helper to render cell symbol
  const renderCellIcon = (state: TrackerCellState) => {
    if (state === 2) {
      return (
        <span className="w-5 h-5 rounded-full bg-[#0e3b2e] text-[#d4af37] flex items-center justify-center text-xs font-bold shadow-xs">
          ✓
        </span>
      );
    }
    if (state === 1) {
      return (
        <span className="w-5 h-5 rounded-full bg-[#e8efe8] border border-[#c59b27] flex items-center justify-center overflow-hidden">
          <span className="w-2.5 h-5 bg-[#c59b27] self-start" />
        </span>
      );
    }
    return (
      <span className="w-5 h-5 rounded-full border border-[#cbd9cd] bg-white flex items-center justify-center opacity-60 hover:opacity-100 hover:border-[#83a287]" />
    );
  };

  // Calculate stats
  let totalPoints = 0;
  const maxPossible = 21 * PRACTICE_CATEGORIES.length * 2; // state 2 is 2 points, state 1 is 1 point

  PRACTICE_CATEGORIES.forEach((cat) => {
    const row = practiceGrid[cat] || [];
    row.forEach((val) => {
      totalPoints += val;
    });
  });

  const completionPct = maxPossible > 0 ? Math.round((totalPoints / maxPossible) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Legend & quick helper */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#486355] bg-[#f2f7f3] p-3 rounded-xl border border-[#dce6dd]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#0e3b2e]">Cell states:</span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border border-slate-300 bg-white" />
            <span>Not done</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border border-[#c59b27] bg-[#faf3dc] flex items-center justify-center text-[10px]">
              ◐
            </span>
            <span>Partial</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[#0e3b2e] text-[#d4af37] flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
            <span>Completed</span>
          </span>
        </div>
        <span className="text-[11px] text-[#718b7d] italic">Tap any cell to cycle status</span>
      </div>

      {/* Progress display */}
      <div className="p-4 bg-gradient-to-r from-[#0e3b2e] to-[#175240] text-white rounded-2xl shadow-sm">
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-serif tracking-wider text-sm text-[#f3e5b8] uppercase font-bold">
            Your 21-Day Practice Consistency
          </span>
          <span className="font-sans font-bold text-lg text-[#e5c158] tabular-nums">
            {completionPct}%
          </span>
        </div>
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c59b27] to-[#f3e5b8] rounded-full transition-all duration-500"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <p className="text-xs text-[#dce7dc] mt-2 italic font-light">
          This reflection is an honest mirror of your dedication and presence. Every step counts.
        </p>
      </div>

      {/* Mobile-scrollable Grid Table */}
      <div className="border border-[#d7e3d9] rounded-2xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[720px] text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#0e3b2e] text-[#fbf9f5] border-b border-[#08261d]">
                <th className="sticky left-0 z-10 bg-[#0e3b2e] py-3 px-3 text-left font-semibold text-xs tracking-wider min-w-[170px] shadow-sm">
                  Daily Practice
                </th>
                {days.map((d) => (
                  <th
                    key={d}
                    className="py-2.5 px-1.5 text-center font-medium text-[11px] min-w-[28px] text-[#dce8df]"
                  >
                    D{d}
                  </th>
                ))}
                <th className="py-2.5 px-2 text-center font-semibold text-[11px] min-w-[48px] text-[#f3e5b8]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9f0ea]">
              {PRACTICE_CATEGORIES.map((category, idx) => {
                const row =
                  practiceGrid[category] || (new Array(21).fill(0) as TrackerCellState[]);
                const rowPoints = row.reduce<number>((sum: number, v: TrackerCellState) => sum + v, 0);
                const rowPct = Math.round((rowPoints / 42) * 100);

                return (
                  <tr
                    key={category}
                    className={`hover:bg-[#fcfdfc] transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#fafcfa]'
                    }`}
                  >
                    <td className="sticky left-0 z-10 py-3 px-3 font-medium text-[#1a3328] bg-inherit border-r border-[#e3ede5] shadow-xs">
                      {category}
                    </td>
                    {days.map((d, dIdx) => {
                      const state = row[dIdx] ?? 0;
                      return (
                        <td
                          key={d}
                          onClick={() => cycleCell(category, dIdx)}
                          className="py-1 px-1 text-center cursor-pointer transition-colors hover:bg-[#eaf3ec]"
                          title={`Day ${d}: ${category} - Click to toggle`}
                        >
                          <div className="flex items-center justify-center">
                            {renderCellIcon(state)}
                          </div>
                        </td>
                      );
                    })}
                    <td className="py-2 px-2 text-center font-semibold text-[#0e3b2e] border-l border-[#e3ede5] tabular-nums">
                      {rowPct}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
