import { createContext, useState, useContext } from 'react';
import { getBudget } from '../api/budgetApi';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(null);
  const [error, setError] = useState(null);

  // ✅ 예산 데이터 가져오는 함수 -> getBudget에서 409 에러처리를 해놨기 때문에 return null if 409
  //null 값에 대한 처리 필요 및 fetching 할때
  const fetchBudget = async () => {
    try {
      const data = await getBudget();
      //가져오는 값이 만약에 null (나의 409 에러처리로 인해)
      if (!data) {
        console.log(
          '예산 데이터가 없는 초기회원이므로 목표금액을 일단 0으로 설정한다.'
        );
        setGoalAmount(0);
        return;
        //여기서 함수를 빠르게 리턴시켜야햐했음
      }
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

export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoalContext must be used within a GoalProvider");
  }
  return context;
};