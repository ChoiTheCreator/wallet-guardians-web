import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/GoalSettingPage.scss';

const GoalSettingPage = () => {
  const [goalAmount, setGoalAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력 값 검증
    if (goalAmount.trim() === '') {
      setErrorMessage('목표 금액을 입력해주세요.');
      return;
    }
    if (isNaN(goalAmount) || parseInt(goalAmount) <= 0) {
      setErrorMessage('숫자로 된 양수 금액을 입력해주세요.');
      return;
    }

    // 목표 금액 설정 로직 (전역 상태 업데이트 등)
    console.log(`목표 금액 설정됨: ${goalAmount}`);
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
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
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
