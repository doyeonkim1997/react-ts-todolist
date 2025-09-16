import { useTodoStore } from "../store/todoStore";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTodoStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 px-3 py-2 rounded-lg shadow-lg 
                 bg-gray-100 dark:bg-gray-700 dark:text-gray-200
                 hover:bg-gray-200 dark:hover:bg-gray-600
                 transition-colors z-50"
    >
      {isDarkMode ? "🌙 다크 모드 켜짐" : "☀️ 라이트 모드 켜짐"}
    </button>
  );
};

export default DarkModeToggle;
