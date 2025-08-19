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
      "flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-300 transform hover:scale-105";

    if (isSameDate(date, selectedDate)) {
      return `${baseStyle} bg-blue-600 text-white shadow-lg scale-105`;
    }

    if (isToday(date)) {
      return `${baseStyle} bg-blue-100 text-blue-600 border-2 border-blue-300`;
    }

    return `${baseStyle} bg-gray-100 text-gray-600 hover:bg-gray-200`;
  };

  const goToPreviousDay = () => {
    onDateSelect(getPreviousDay(selectedDate));
  };

  const goToNextDay = () => {
    onDateSelect(getNextDay(selectedDate));
  };

  return (
    <div className="mb-8">
      <div className="mb-4 px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousDay}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
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
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
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

      <div className="px-6 py-2">
        <div className="flex justify-center gap-2">
          {dates.map((date, index) => (
            <button
              key={`${date.getTime()}-${index}`}
              onClick={() => onDateSelect(date)}
              className={getDateButtonStyle(date)}
              aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 선택`}
            >
              <span className="text-sm font-medium mb-1">
                {getDayOfWeek(date)}
              </span>
              <span className="text-xl font-bold">{date.getDate()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
