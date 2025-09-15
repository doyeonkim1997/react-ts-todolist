import { useState } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

/**
 * 새로운 투두 추가를 위한 폼 컴포넌트
 */
export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAdd(trimmedText);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3 w-full">
      {/* 입력창 */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="어떤 일을 하실 건가요? ✨"
        className="
          flex-1 min-w-0
          px-3 py-2 sm:px-4 sm:py-3
          border border-gray-200 dark:border-slate-500
          rounded-xl
          focus:outline-none focus:ring-2 focus:ring-blue-500
          bg-gray-50 dark:bg-slate-600
          text-gray-800 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-400
          transition-colors duration-300
        "
      />

      {/* 버튼 */}
      <button
        type="submit"
        className="
          shrink-0
          px-3 sm:px-5 py-2 sm:py-3
          bg-blue-600 text-white rounded-xl
          hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors font-medium
          whitespace-nowrap
        "
      >
        추가
      </button>
    </form>
  );
}
