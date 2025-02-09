import { createContext, useState } from 'react';
import { getBudget } from '../api/budgetApi';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(null);
  const [error, setError] = useState(null);

  // ✅ 예산 데이터 가져오는 함수
  const fetchBudget = async () => {
    try {
      const data = await getBudget();
      console.log('✅ 유저 외곽오카네 정보:', data);
      console.log('✅ 유저 오카네 정보:', data.amount);
      setGoalAmount(data.amount);
      return data.amount;
      //`${userBudget.toLocaleString()} 원` -> 콤마 찍히는거임
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
