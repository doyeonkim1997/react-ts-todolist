import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const completedCount = todos.filter((todo) => todo.completed).length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">
          아직 할 일이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {" "}
      {/* ✅ 배경색/스크롤 빼고 여백만 유지 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      {completedCount > 0 && (
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-400 dark:text-gray-500">
            🎉 {completedCount}개의 할 일을 완료했습니다!
          </div>
        </div>
      )}
    </div>
  );
}
