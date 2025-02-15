import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';
import GlobalModalMessage from '../components/GlobalModalMesaage';
import { setBudget } from '../api/budgetApi';
import '../style/GoalSettingPage.scss';

const GoalSettingPage = () => {
  const { goalAmount, setGoalAmount, fetchBudget } = useContext(GoalContext);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const [budgetAmount, setBudgetAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ 기존 목표 금액을 불러와서 `budgetAmount`에 저장
  useEffect(() => {
    const loadGoalAmount = async () => {
      const savedGoalAmount = localStorage.getItem('goalAmount');

      if (savedGoalAmount) {
        setBudgetAmount(savedGoalAmount);
      } else {
        const fetchedGoal = await fetchBudget();
        if (fetchedGoal !== null) {
          setBudgetAmount(fetchedGoal.toString());
        }
      }
    };
    loadGoalAmount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!budgetAmount || isNaN(budgetAmount) || parseInt(budgetAmount) <= 0) {
      setErrorMessage('숫자로 된 양수 금액을 입력해주세요.');
      return;
    }

    const newGoalAmount = parseInt(budgetAmount, 10);

    try {
      const response = await setBudget(newGoalAmount);
      console.log('✅ 목표 금액 설정 응답:', response);

      if (response.success) {
        setGoalAmount(response.data.amount); // ✅ 전역 상태 업데이트
        localStorage.setItem('goalAmount', response.data.amount); // ✅ 로컬 스토리지 업데이트

        setModalMessage({
          type: 'success',
          message: '목표 금액 설정에 성공했습니다!',
        });

        setTimeout(() => {
          navigate('/main');
        }, 1300);
      } else {
        setModalMessage({
          type: 'error',
          message: '목표 금액 설정에 실패했습니다.',
        });
        setTimeout(() => {
          setModalMessage({ type: '', message: '' });
        }, 1300);
      }
    } catch (error) {
      console.error('🚨 목표 금액 설정 오류:', error);
      alert('서버와 통신 중 문제가 발생했습니다.');
    }

    setErrorMessage('');
  };

  return (
    <div className="goal-setting-page">
      <GlobalModalMessage
        type={modalMessage.type}
        message={modalMessage.message}
      />
      <h2>목표 금액 설정</h2>
      <form className="goal-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="목표 금액 입력"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          설정 완료
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default GoalSettingPage;
