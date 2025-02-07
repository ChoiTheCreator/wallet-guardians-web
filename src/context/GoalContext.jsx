import React, { createContext, useState } from 'react';
import { getBudget } from '../api/budgetApi'; // ✅ 예산 조회 API 가져오기

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(null); // ✅ 목표 금액 상태
  const [error, setError] = useState(null); // ✅ 오류 상태 추가

  // ✅ 예산 데이터 가져오는 함수
  const fetchBudget = async () => {
    try {
      const budget = await getBudget(); // ✅ API 호출
      console.log('📌 예산 조회 성공:', budget);

      if (budget && budget.data && budget.data.amount !== undefined) {
        setGoalAmount(budget.data.amount); // ✅ 목표 금액 상태 업데이트
      } else {
        setGoalAmount(null); // ✅ 목표 금액이 없으면 초기화
      }
    } catch (error) {
      console.error('🚨 예산 조회 실패:', error);
      setError(error);
    }
  };

  return (
    <GoalContext.Provider
      value={{ goalAmount, setGoalAmount, fetchBudget, error }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalProvider;
