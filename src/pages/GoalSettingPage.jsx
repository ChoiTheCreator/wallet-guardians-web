import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext'; // Context import
import axios from 'axios';
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

    const goalData = {
      yearMonth: parseInt(yearMonth),
      budgetAmount: parseInt(budgetAmount, 10),
    };

    try {
      const response = await axios.post(
        `http://백엔드서버주소/budget/`,
        goalData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert('목표금액이 성공적으로 저장되었습니다!');
        navigate('/main'); // 저장 후 메인 페이지로 이동
      } else {
        alert('목표 금액 설정에 실패 하였습니다.');
      }
    } catch (error) {
      console.error('목표 금액 설정 오류:', error);
      alert('서버와 통신 중 문제가 발생했습니다.');
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