import { useState } from "react";
import { ProfileSection } from "./components/ProfileSection";
import { DateSlider } from "./components/DateSlider";
import { TodoForm } from "./components/TodoForm";
import { ProgressBar } from "./components/ProgressBar";
import { TodoList } from "./components/TodoList";
import { DEFAULT_USER_PROFILE } from "./constants/user";
import { useTodoStore } from "./store/todoStore";
import DarkModeToggle from "./components/DarkModeToggled";

function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const {
    isDarkMode,
    getTodosForDate,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  } = useTodoStore();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* 전체 배경. 배경은 항상 전체 화면을 채움*/}
      <div
        className="
        min-h-screen
        bg-gradient-to-br from-blue-50 to-indigo-100
        dark:from-gray-900 dark:to-gray-800
        flex flex-col
      "
      >
        {/* 상단 고정 */}
        <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
          <ProfileSection
            profileImage={DEFAULT_USER_PROFILE.profileImage}
            nickname={DEFAULT_USER_PROFILE.nickname}
          />
          <DateSlider
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* 전체 투두 박스 */}
        <div className="flex-1 flex justify-center items-start">
          <div
            className="
            w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto px-4
            bg-white dark:bg-slate-800
            rounded-2xl shadow-lg overflow-hidden
            transition-colors duration-300
            h-[420px] sm:h-[520px] md:h-[600px] 
            max-h-[70vh]
            flex flex-col
          "
          >
            {/* 진행도 + 입력폼 */}
            <div className="p-6 pb-0 flex-shrink-0">
              <ProgressBar
                completed={
                  getTodosForDate(selectedDate).filter((t) => t.completed)
                    .length
                }
                total={getTodosForDate(selectedDate).length}
              />
              <TodoForm onAdd={(text) => addTodo(selectedDate, text)} />

              {/* ✅ 입력폼 아래 간격 복원 */}
              <div className="mb-4">
                <div className="h-4"></div>
              </div>
            </div>

            {/* 투두리스트 영역 → 여기만 스크롤 */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <TodoList
                todos={getTodosForDate(selectedDate)}
                onToggle={(id) => toggleTodo(selectedDate, id)}
                onDelete={(id) => deleteTodo(selectedDate, id)}
                onEdit={(id, text) => editTodo(selectedDate, id, text)}
              />
            </div>
          </div>
        </div>
        {/* 투두 박스 바로 아래 다크모드 토글*/}
        <div className="w-full max-w-xl mx-auto px-4 mt-3 flex justify-end">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}

export default App;
