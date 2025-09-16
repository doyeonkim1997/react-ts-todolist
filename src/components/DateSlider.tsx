import {
  generateDateRange,
  formatYearMonth,
  getDayOfWeek,
  isToday,
  isSameDate,
  getPreviousDay,
  getNextDay,
} from "../utils/dateUtils";

interface DateSliderProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

/**
 * 날짜 선택을 위한 슬라이더 컴포넌트
 */
export function DateSlider({ selectedDate, onDateSelect }: DateSliderProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const dates = generateDateRange(selectedDate);

  const getDateButtonStyle = (date: Date, isFuture: boolean): string => {
    const baseStyle =
      "flex flex-col items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-xl transition-all duration-300 transform";

    if (isSameDate(date, selectedDate)) {
      return `${baseStyle} bg-blue-600 text-white shadow-lg scale-105
                        dark:bg-blue-500 dark:text-white`;
    }

    if (isToday(date)) {
      return `${baseStyle} bg-blue-100 text-blue-600 border-2 border-blue-300
                        dark:bg-slate-700 dark:text-blue-400 dark:border-blue-500`;
    }

    // 미래 날짜 → 흐림 처리
    if (isFuture) {
      return `${baseStyle} bg-gray-100 text-gray-400 dark:bg-slate-600 dark:text-gray-500 opacity-60 cursor-not-allowed`;
    }

    return `${baseStyle} bg-white text-gray-600 hover:bg-gray-100
                      dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600`;
  };

  const goToPreviousDay = () => {
    if (selectedDate > oneWeekAgo) {
      onDateSelect(getPreviousDay(selectedDate));
    }
  };

  const goToNextDay = () => {
    if (selectedDate < today) {
      onDateSelect(getNextDay(selectedDate));
    }
  };

  return (
    <div className="mb-4 sm:mb-8">
      <div className="mb-4 px-6">
        <div className="flex items-center justify-between">
          {/* 이전 버튼 */}
          <button
            onClick={goToPreviousDay}
            disabled={selectedDate <= oneWeekAgo}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              selectedDate <= oneWeekAgo
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-300 dark:hover:text-gray-100"
            }`}
            aria-label="이전 날짜"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* 현재 월 표시 */}
          <div className="text-lg font-medium text-gray-700 px-2 py-1">
            {formatYearMonth(selectedDate)}
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={goToNextDay}
            disabled={selectedDate >= today}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              selectedDate >= today
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-300 dark:hover:text-gray-100"
            }`}
            aria-label="다음 날짜"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 날짜 리스트 */}
      <div className="px-6 py-1 sm:py-2">
        <div className="flex justify-center gap-2">
          {dates.map((date, index) => {
            const isFuture = date > today;

            return (
              <button
                key={`${date.getTime()}-${index}`}
                onClick={() => {
                  if (!isFuture) onDateSelect(date);
                }}
                disabled={isFuture}
                className={getDateButtonStyle(date, isFuture)}
                aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 선택`}
              >
                <span className="text-[10px] sm:text-xs font-medium mt-1 sm:mt-0">
                  {getDayOfWeek(date)}
                </span>
                <span className="text-base sm:text-xl font-bold">
                  {date.getDate()}
                </span>
                {isFuture && <span className="text-xs">🔒</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
