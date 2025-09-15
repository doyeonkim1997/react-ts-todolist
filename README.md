# TodoList 📝

![TodoList 스크린샷](https://github.com/user-attachments/assets/e4e2e07e-edee-42c7-b2b2-0f856664f6b6)

React + TypeScript로 만든 모던한 할 일 관리 애플리케이션입니다.  
상태 관리는 **Zustand**로 구현되어 있으며, `persist` 미들웨어를 활용하여 **새로고침해도 데이터가 유지**됩니다.

## 주요 기능

- **날짜별 할 일 관리** - 원하는 날짜를 선택하여 투두 관리
- **완료/미완료 토글** - 간단한 클릭으로 할 일 상태 변경
- **실시간 편집** - 더블클릭으로 할 일 내용 수정
- **삭제 기능** - 불필요한 할 일 제거
- **진행률 시각화** - 완료된 할 일의 진행 상황을 한눈에 확인
- **상태 영속화(LocalStorage)** - 새로고침해도 할 일 데이터 유지
- **반응형 디자인** - 모든 디바이스에서 최적화된 UI

## 🚀 빠른 시작

### 설치

```bash
git clone [repository-url]
cd TodoList
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 🛠️ 기술 스택

- **React 19.1.1** - 최신 React 기능 활용
- **TypeScript 5.8.3** - 타입 안정성 보장
- **Vite 7.1.0** - 빠른 개발 환경
- **Tailwind CSS 3.4.17** - 모던한 UI 디자인
- **Zustand 5.0.0+** - 전역 상태 관리
- **Zustand/middleware** - localStorage와 상태 동기화

## 🔧 사용법

1. **할 일 추가**: 입력창에 할 일을 입력하고 "추가" 버튼 클릭
2. **날짜 변경**: 상단 날짜 슬라이더로 원하는 날짜 선택
3. **완료 체크**: 할 일 옆 체크박스 클릭으로 완료 상태 변경
4. **편집**: 할 일을 더블클릭하여 내용 수정
5. **삭제**: 할 일 옆 휴지통 아이콘 클릭으로 삭제
6. **데이터 유지**: 새로고침 후에도 기존 할 일 목록이 유지됨 (localStorage 연동)

## 📁 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트
├── hooks/          # 커스텀 훅
├── store/          # Zustand store (todoStore.ts)
├── types/          # TypeScript 타입 정의
├── utils/          # 유틸리티 함수
└── constants/      # 상수 정의
```
