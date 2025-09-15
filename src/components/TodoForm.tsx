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
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="어떤 일을 하실 건가요? ✨"
            className="
                      flex-1 px-4 py-3 border border-gray-200 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      bg-gray-50 placeholder-gray-400
                      dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 dark:placeholder-gray-400
                      transition-colors duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
}
