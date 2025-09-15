import { create } from "zustand";
import { persist } from "zustand/middleware";

// 타입스크립트의 타입 정의

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  date: string;
}

type Filter = "all" | "completed" | "incomplete";

// 상태와 액션 정의
interface TodoState {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;

  // 다크 모드 상태 추가
  isDarkmode: boolean;
  toggleDarkMode: () => void;

  addTodo: (date: Date, text: string) => void;
  toggleTodo: (date: Date, id: string) => void;
  deleteTodo: (date: Date, id: string) => void;
  editTodo: (date: Date, id: string, text: string) => void;
  getTodosForDate: (date: Date) => Todo[];
}

// TypeScript의 제네릭 문법
// useTodoStore라는 이름의 훅 생성
export const useTodoStore = create(
  persist<TodoState>(
    (set, get) => ({
      todos: [],
      filter: "all",
      setFilter: (filter) => set({ filter }),

      // 다크 모드 상태 관리 추가
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      addTodo: (date, text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              date: date.toDateString(),
            },
          ],
        })),
      toggleTodo: (date, id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.date === date.toDateString() && todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        })),
      deleteTodo: (date, id) =>
        set((state) => ({
          todos: state.todos.filter(
            (todo) => !(todo.date === date.toDateString() && todo.id === id)
          ),
        })),
      editTodo: (date, id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.date === date.toDateString() && todo.id === id
              ? { ...todo, text }
              : todo
          ),
        })),
      getTodosForDate: (date) =>
        get().todos.filter((todo) => todo.date === date.toDateString()),
    }),
    { name: "todo-storage" }
  )
);
export const useTodosStore = useTodoStore; // 별칭 추가
