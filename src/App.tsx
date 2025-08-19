import { useState } from "react";
import { ProfileSection } from "./components/ProfileSection";
import { DateSlider } from "./components/DateSlider";
import { TodoForm } from "./components/TodoForm";
import { ProgressBar } from "./components/ProgressBar";
import { TodoList } from "./components/TodoList";
import { ContactFAB } from "./components/ContactFAB";
import { useTodos } from "./hooks/useTodos";
import { DEFAULT_USER_PROFILE } from "./constants/user";

function App() {
  // 오늘 날짜로 초기화 (시간 정보 제거하여 정확한 날짜 비교)
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const { getTodosForDate, addTodo, toggleTodo, deleteTodo, editTodo } =
    useTodos();

  const handleAddTodo = (text: string) => {
    addTodo(selectedDate, text);
  };

  const handleToggleTodo = (id: string) => {
    toggleTodo(selectedDate, id);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(selectedDate, id);
  };

  const handleEditTodo = (id: string, text: string) => {
    editTodo(selectedDate, id, text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-xl px-4">
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

        {/* 투두 리스트 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
          <div className="p-6 pb-0">
            {/* 진행도 바 - 독립적으로 배치 */}
            <ProgressBar
              completed={
                getTodosForDate(selectedDate).filter((todo) => todo.completed)
                  .length
              }
              total={getTodosForDate(selectedDate).length}
            />

            {/* 투두 작성 폼 - 진행도 바와 완전히 분리 */}
            <TodoForm onAdd={handleAddTodo} />
          </div>

          <div className="h-[400px] overflow-y-auto px-6 pb-6 scrollbar-thin">
            <TodoList
              todos={getTodosForDate(selectedDate)}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          </div>
        </div>

        {/* 하단 여백 */}
        <div className="h-8"></div>
      </div>

      {/* 연락하기 FAB */}
      <ContactFAB />
    </div>
  );
}

export default App;
