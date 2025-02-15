import { createContext, useState, useEffect, useContext } from 'react';
import { getBudget } from '../api/budgetApi';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(
    localStorage.getItem('goalAmount')
      ? parseInt(localStorage.getItem('goalAmount'), 10)
      : null
  );
  const [error, setError] = useState(null);

  // ✅ 예산 데이터 가져오는 함수
  const fetchBudget = async () => {
    try {
      const data = await getBudget();
      if (data !== null) {
        console.log('✅ 서버에서 가져온 목표 금액:', data.amount);

        // ✅ 기존 값과 서버에서 가져온 값이 다를 경우만 업데이트
        if (goalAmount === null || goalAmount !== data.amount) {
          setGoalAmount(data.amount);
          localStorage.setItem('goalAmount', data.amount);
        }
        return data.amount;
      } else {
        console.log('🚨 예산 데이터 없음, 기존 목표 금액 유지');
        return goalAmount;
      }
    } catch (error) {
      console.error('🚨 예산 조회 실패:', error);
      setError(error);
    }
  };

  // ✅ 앱이 로드될 때 목표 금액을 서버 & 로컬 스토리지에서 가져오기
  useEffect(() => {
    fetchBudget();
  }, []);

  return (
    <GoalContext.Provider
      value={{ goalAmount, setGoalAmount, fetchBudget, error }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalProvider;

export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoalContext must be used within a GoalProvider");
  }
  return context;
};