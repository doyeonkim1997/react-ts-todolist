interface ProgressBarProps {
  completed: number;
  total: number;
}

/**
 * 투두 진행률을 표시하는 진행도 바 컴포넌트
 */
export function ProgressBar({ completed, total }: ProgressBarProps) {
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  if (total === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-600 min-w-fit">
          {completed}/{total} 완료
        </span>
      </div>
    </div>
  );
}
