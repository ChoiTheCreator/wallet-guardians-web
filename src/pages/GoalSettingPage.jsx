import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext'; // Context import
import '../style/GoalSettingPage.scss';

const GoalSettingPage = () => {
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지만 로컬 상태
  //아래의 goalAmount는 GoalContext.jsx의 전역 상태를 가져온 것.
  //App.jsx 참고하면 됨 (거기에 다 들어있음)
  const { goalAmount, setGoalAmount: setGlobalGoalAmount } =
    useContext(GoalContext); // 전역 상태 사용
  const navigate = useNavigate();

  const [yearMonth, setYearMonth] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 값 검증
    if (!goalAmount || isNaN(goalAmount) || parseInt(goalAmount) <= 0) {
      setErrorMessage('숫자로 된 양수 금액을 입력해주세요.');
      return;
    }

    setErrorMessage(''); // 에러 메시지 초기화
    navigate('/main'); // 설정 후 메인 페이지로 이동
  };

  return (
    <div className="goal-setting-page">
      <h1>목표 금액 설정</h1>
      <p>한 달에 사용할 수 있는 목표 금액을 입력해주세요.</p>
      <form className="goal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="목표 금액 입력 (숫자)"
          value={goalAmount || ''} // 전역 상태 사용
          onChange={(e) => setGlobalGoalAmount(e.target.value)} // 전역 상태 직접 변경
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-btn">
          설정하기
        </button>
      </form>
    </div>
  );
};

export default GoalSettingPage;
