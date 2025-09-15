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
  const dates = generateDateRange(selectedDate);

  const getDateButtonStyle = (date: Date): string => {
    const baseStyle =
      "flex flex-col items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-xl transition-all duration-300 transform hover:scale-105";

    if (isSameDate(date, selectedDate)) {
      return `${baseStyle} bg-blue-600 text-white shadow-lg scale-105
                        dark:bg-blue-500 dark:text-white`;
    }

    if (isToday(date)) {
      return `${baseStyle} bg-blue-100 text-blue-600 border-2 border-blue-300
                        dark:bg-slate-700 dark:text-blue-400 dark:border-blue-500`;
    }

    return `${baseStyle} bg-white text-gray-600 hover:bg-gray-100
                      dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600`;
  };

  const goToPreviousDay = () => {
    onDateSelect(getPreviousDay(selectedDate));
  };

  const goToNextDay = () => {
    onDateSelect(getNextDay(selectedDate));
  };

  return (
    <div className="mb-4 sm:mb-8">
      <div className="mb-4 px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousDay}
            className="p-2 rounded-lg 
                      bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800
                      dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-300 dark:hover:text-gray-100
                      transition-colors duration-300"
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

          <div className="text-lg font-medium text-gray-700 px-2 py-1">
            {formatYearMonth(selectedDate)}
          </div>

          <button
            onClick={goToNextDay}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800
            dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-300 dark:hover:text-gray-100
            transition-colors duration-300"
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

      <div className="px-6 py-1 sm:py-2">
        <div className="flex justify-center gap-2">
          {dates.map((date, index) => (
            <button
              key={`${date.getTime()}-${index}`}
              onClick={() => onDateSelect(date)}
              className={getDateButtonStyle(date)}
              aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 선택`}
            >
              <span className="text-[10px] sm:text-xs font-medium mt-1 sm:mt-0">
                {getDayOfWeek(date)}
              </span>
              <span className="text-base sm:text-xl font-bold">
                {date.getDate()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
