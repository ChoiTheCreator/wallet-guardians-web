import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext'; // Context import
import GlobalModalMessage from '../components/GlobalModalMesaage'; //성공시 띄워주는 모달메시지
import { setBudget } from '../api/budgetApi';
import '../style/GoalSettingPage.scss';

const GoalSettingPage = () => {
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지만 로컬 상태
  const { setGoalAmount: setGlobalGoalAmount } = useContext(GoalContext); // 전역 상태 사용
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력 값 검증
    if (!budgetAmount || isNaN(budgetAmount) || parseInt(budgetAmount) <= 0) {
      setErrorMessage('숫자로 된 양수 금액을 입력해주세요.');
      return;
    }

    const goalAmount = parseInt(budgetAmount, 10);

    try {
      const response = await setBudget(goalAmount);
      console.log('✅ 목표 금액 설정 응답:', response);

      if (response.success) {
        // ✅ 전역 상태 업데이트
        setGlobalGoalAmount(response.data.amount);
        setModalMessage({
          type: 'success',
          message: '목표 금액 설정에 성공했습니다!',
        });

        setTimeout(() => {
          navigate('/main'); // 저장 후 메인 페이지로 이동 (setTimeout이 비동기함수라서 )
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

    setErrorMessage(''); // 에러 메시지 초기화
  };

  return (
    <div className="goal-setting-page">
      {' '}
      <GlobalModalMessage
        type={modalMessage.type}
        message={modalMessage.message}
      ></GlobalModalMessage>
      {/* ✅ 기존 `goal-setting-container` → `goal-setting-page`로 변경 */}
      <h2>목표 금액 설정</h2>
      <form className="goal-form" onSubmit={handleSubmit}>
        {' '}
        {/* ✅ 클래스 추가 */}
        <input
          type="number"
          placeholder="목표 금액 입력"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          설정 완료
        </button>{' '}
        {/* ✅ 스타일 적용 */}
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default GoalSettingPage;
