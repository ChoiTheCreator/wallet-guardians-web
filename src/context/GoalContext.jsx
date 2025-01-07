import React, { createContext, useState } from 'react';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  //전역 상태관리 : 10000
  const [goalAmount, setGoalAmount] = useState(10000); // 전역 상태로 목표 금액 관리

  return (
    //GoalContext는 createContext()를 통해 생성된 Context 객체임 -> 공유공간
    //Provider 컴포넌트를 제공하는데, 이는 전역 상태 관리를 위한 것
    //value 속성에 전역으로 관리할, 상태와 함수를 담아 "children"에게 제공한다.

    //App,jsx에 가보면 GoalProvider로 감싸진 모든 컴포넌트들을 렌더링 할 수 있다.
    //그 감싸진 녀석들이 바로 children임
    <GoalContext.Provider value={{ goalAmount, setGoalAmount }}>
      {children}
    </GoalContext.Provider>
  );
};
