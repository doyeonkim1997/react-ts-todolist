import { useState, useCallback } from "react";
import type { Todo, DailyTodos } from "../types/todo";

export function useTodos() {
  const [dailyTodos, setDailyTodos] = useState<DailyTodos>({});

  const formatDateKey = useCallback((date: Date): string => {
    return date.toISOString().split("T")[0];
  }, []);

  const getTodosForDate = useCallback(
    (date: Date): Todo[] => {
      const dateKey = formatDateKey(date);
      return dailyTodos[dateKey] || [];
    },
    [dailyTodos, formatDateKey]
  );

  const addTodo = useCallback(
    (date: Date, text: string) => {
      const dateKey = formatDateKey(date);
      const newTodo: Todo = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text,
        completed: false,
        date: dateKey,
        createdAt: new Date(),
      };

      setDailyTodos((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newTodo],
      }));
    },
    [formatDateKey]
  );

  const toggleTodo = useCallback(
    (date: Date, id: string) => {
      const dateKey = formatDateKey(date);
      setDailyTodos((prev) => ({
        ...prev,
        [dateKey]: (prev[dateKey] || []).map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
    },
    [formatDateKey]
  );

  const deleteTodo = useCallback(
    (date: Date, id: string) => {
      const dateKey = formatDateKey(date);
      setDailyTodos((prev) => ({
        ...prev,
        [dateKey]: (prev[dateKey] || []).filter((todo) => todo.id !== id),
      }));
    },
    [formatDateKey]
  );

  const editTodo = useCallback(
    (date: Date, id: string, text: string) => {
      const dateKey = formatDateKey(date);
      setDailyTodos((prev) => ({
        ...prev,
        [dateKey]: (prev[dateKey] || []).map((todo) =>
          todo.id === id ? { ...todo, text } : todo
        ),
      }));
    },
    [formatDateKey]
  );

  return {
    dailyTodos,
    getTodosForDate,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  };
}
