import { useTodoStore } from "../store/todoStore";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTodoStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="mb-4 px-3 py-1 rounded bg-gray-100 dark:bg-gray-600 dark:text-gray-300 text-sm"
    >
      {isDarkMode ? "🌙 다크 모드 켜짐" : "☀️ 라이트 모드 켜짐"}
    </button>
  );
};

export default DarkModeToggle;
