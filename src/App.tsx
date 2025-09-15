import { useState } from "react";
import { ProfileSection } from "./components/ProfileSection";
import { DateSlider } from "./components/DateSlider";
import { TodoForm } from "./components/TodoForm";
import { ProgressBar } from "./components/ProgressBar";
import { TodoList } from "./components/TodoList";
import { ContactFAB } from "./components/ContactFAB";
import { DEFAULT_USER_PROFILE } from "./constants/user";
import { useTodosStore } from "./store/todoStore";
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
  } = useTodosStore();

  return (
    <div className={isDarkMode ? "dark" : "min-h-screen"}>
      <div
        className="
          min-h-screen
          bg-gradient-to-br from-blue-50 to-indigo-100
          dark:from-gray-900 dark:to-gray-800
          flex items-center justify-center
        "
      >
        <div className="w-full max-w-xl px-4 sm:px- 6 lg:px-8 py-8">
          {/* 프로필 섹션 */}
          <ProfileSection
            profileImage={DEFAULT_USER_PROFILE.profileImage}
            nickname={DEFAULT_USER_PROFILE.nickname}
          />

          {/* 날짜 슬라이더 */}
          <DateSlider
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          {/* ✅ 투두 전체 카드 */}
          <div
            className="
              bg-white dark:bg-slate-800
              rounded-2xl shadow-lg overflow-hidden
              transition-colors duration-300
              max-h-[70vh] sm:h-[600px] md:h-[500px] 
              flex flex-col
            "
          >
            {/* 진행도 바 + 입력폼 */}
            <div className="p-6 pb-0 flex-shrink-0">
              <ProgressBar
                completed={
                  getTodosForDate(selectedDate).filter((todo) => todo.completed)
                    .length
                }
                total={getTodosForDate(selectedDate).length}
              />
              <TodoForm onAdd={(text) => addTodo(selectedDate, text)} />
              {/* 간격 확보*/}
              <div className="mb-4">
                <div className="h-4"></div>
              </div>
            </div>

            {/* 리스트 영역 */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <TodoList
                todos={getTodosForDate(selectedDate)}
                onToggle={(id) => toggleTodo(selectedDate, id)}
                onDelete={(id) => deleteTodo(selectedDate, id)}
                onEdit={(id, text) => editTodo(selectedDate, id, text)}
              />
            </div>
          </div>

          {/* 하단 컨트롤 */}
          <div className="h-3"></div>
          <div className="flex gap-2 justify-end">
            <DarkModeToggle />
            <ContactFAB />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
