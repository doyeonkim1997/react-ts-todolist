/**
 * 📅 날짜 관련 상수 및 유틸리티 함수들
 *
 * 이 파일은 날짜 처리와 관련된 모든 로직을 모아둔 곳입니다.
 * 클린코드 원칙에 따라 관련 기능들을 한 곳에 모았습니다.
 */

// 📅 한국어 요일 배열 (일요일=0부터 시작)
export const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"] as const;

// ⚙️ 날짜 슬라이더 설정값들
export const DATE_SLIDER_CONFIG = {
  DAYS_BEFORE: 3, // 현재 날짜 앞에 보여줄 날짜 수
  DAYS_AFTER: 3, // 현재 날짜 뒤에 보여줄 날짜 수
  TOTAL_DAYS: 7, // 총 표시할 날짜 수 (3 + 1 + 3)
} as const;

/**
 * 날짜를 YYYY-MM-DD 형식의 문자열로 변환
 *
 * 용도: 투두를 날짜별로 저장할 때 키(key)로 사용
 * 예시: new Date('2025-01-13') → "2025-01-13"
 *
 * @param date - 변환할 날짜 객체
 * @returns YYYY-MM-DD 형식의 문자열
 */
export function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * 날짜를 "YYYY년 MM월" 형식으로 포맷
 *
 * 용도: 날짜 슬라이더 상단에 현재 월/년 표시
 * 예시: new Date('2025-01-13') → "2025년 1월"
 *
 * @param date - 포맷할 날짜 객체
 * @returns "YYYY년 MM월" 형식의 문자열
 */
export function formatYearMonth(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

/**
 * 날짜에서 요일을 한글로 반환
 *
 * 동작 원리:
 * - date.getDay()는 0(일요일)~6(토요일) 숫자를 반환
 * - DAYS_OF_WEEK 배열에서 해당 인덱스의 한글 요일을 가져옴
 *
 * @param date - 요일을 구할 날짜 객체
 * @returns 한글 요일 ("일", "월", "화", ...)
 */
export function getDayOfWeek(date: Date): string {
  return DAYS_OF_WEEK[date.getDay()];
}

/**
 * 주어진 날짜가 오늘인지 확인
 *
 * 비교 방법:
 * - toDateString()을 사용하여 시간 정보 제외하고 날짜만 비교
 * - 예: "Mon Jan 13 2025"와 같은 형식으로 비교
 *
 * @param date - 확인할 날짜
 * @returns 오늘이면 true, 아니면 false
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * 두 날짜가 같은 날인지 확인
 *
 * 비교 방법:
 * - toDateString()을 사용하여 시간 정보 제외하고 날짜만 비교
 * - 시간이 다르더라도 같은 날이면 true 반환
 *
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @returns 같은 날이면 true, 다르면 false
 */
export function isSameDate(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString();
}

/**
 * 중심 날짜를 기준으로 날짜 범위 배열 생성
 *
 * 동작 과정:
 * 1. 빈 배열 생성
 * 2. 중심 날짜에서 DAYS_BEFORE만큼 이전부터 시작
 * 3. DAYS_AFTER만큼 이후까지 루프 실행
 * 4. 각 날짜를 새로운 Date 객체로 생성하여 배열에 추가
 *
 * 예시: centerDate가 1월 13일이면
 * → [1월 10일, 1월 11일, 1월 12일, 1월 13일, 1월 14일, 1월 15일, 1월 16일]
 *
 * @param centerDate - 중심이 될 날짜
 * @returns 날짜 객체들의 배열 (총 7개)
 */
export function generateDateRange(centerDate: Date): Date[] {
  const dates: Date[] = [];
  const baseDate = new Date(centerDate);

  // -3부터 +3까지 반복 (총 7번)
  for (
    let i = -DATE_SLIDER_CONFIG.DAYS_BEFORE;
    i <= DATE_SLIDER_CONFIG.DAYS_AFTER;
    i++
  ) {
    const date = new Date(baseDate); // 새로운 Date 객체 생성
    date.setDate(baseDate.getDate() + i); // 기준 날짜에서 i일 더하기
    dates.push(date);
  }

  return dates;
}

/**
 * 날짜에 지정된 일수를 더하는 함수
 *
 * 주의사항:
 * - 원본 날짜 객체를 변경하지 않고 새로운 객체 반환
 * - 월/년 경계도 자동으로 처리됨
 *
 * @param date - 기준 날짜
 * @param days - 더할 일수 (음수면 빼기)
 * @returns 계산된 새로운 날짜 객체
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date); // 원본 보존을 위해 복사
  result.setDate(date.getDate() + days);
  return result;
}

/**
 * 하루 이전 날짜를 반환
 *
 * @param date - 기준 날짜
 * @returns 하루 전 날짜 객체
 */
export function getPreviousDay(date: Date): Date {
  return addDays(date, -1);
}

/**
 * 하루 이후 날짜를 반환
 *
 * @param date - 기준 날짜
 * @returns 하루 후 날짜 객체
 */
export function getNextDay(date: Date): Date {
  return addDays(date, 1);
}
