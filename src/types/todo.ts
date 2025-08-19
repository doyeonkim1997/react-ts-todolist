export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string; // YYYY-MM-DD 형식
  createdAt: Date;
}

export type TodoFilter = "all" | "active" | "completed";

export interface DailyTodos {
  [date: string]: Todo[]; // 날짜별로 투두 리스트 관리
}
