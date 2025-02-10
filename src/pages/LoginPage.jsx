import { useContext, useState, useEffect } from 'react';
import '../style/LoginPage.scss';
import SignupPage from './SignupPage';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';
import { login } from '../api/authApi.jsx';
import { css, keyframes } from '@emotion/react';

// 로딩 시 필요한
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
  `;

const spinnerStyle = css`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-left: 10px;
`;

const LoginPage = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false); // 회원가입 모달 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const [fetchingBudget, setFetchingBudget] = useState(false); //예산 데이터 불러오고있는지?
  const navigate = useNavigate();
  const { goalAmount, fetchBudget } = useContext(GoalContext); //get하는 함수도 가져오자.

  // 회원가입 모달 여닫기
  const openSignupModal = () => setIsSignupOpen(true);
  const closeSignupModal = () => setIsSignupOpen(false);

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 로그인 시작 시 로딩 상태 활성화

    try {
      const data = await login(email, password);
      // const { token, refreshToken } = data; (토큰 key명 바꿈)
      const { accessToken, refreshToken } = data.data;
      console.log('🔹 로그인 응답 데이터:', data); // 응답 구조 확인 디버깅용임
      console.log('🔑 저장할 accessToken:', accessToken);
      console.log('🔄 저장할 refreshToken:', refreshToken);

      //로그인 성공시 로컬스토리지에서 받아온 토큰들 저장.
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setModalMessage({
        type: 'success',
        message: '로그인 성공! 데이터를 불러오고 있습니다!',
      });

      setFetchingBudget(true);
      const budgetAmount = await fetchBudget(); //로그인 성공하면 갖고 있는 예산 있는지 확인
      setFetchingBudget(false);

      console.log('🏦 로그인 후 받은 예산 금액:', budgetAmount); // 디버깅용 코드임

      //  goalAmount가 업데이트되기 전에 budgetAmount를 기반으로 페이지 이동 (성능 개선 가능성? )
      setTimeout(() => {
        if (budgetAmount !== null && budgetAmount > 0) {
          navigate('/main');
        } else {
          navigate('/initial');
        }
      }, 500);
    } catch (error) {
      console.error('로그인 실패:', error);
      setModalMessage({
        type: 'error',
        message: '로그인 실패! 다시 시도해주세요.',
      });
    } finally {
      setLoading(false); // 응답 완료 후 로딩 해제
    }
  };

  return (
    <div className="login-page-container">
      <h1>Login Page</h1>
      <p>로그인을 진행해주세요.</p>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="login-button"
          disabled={loading || fetchingBudget}
        >
          {loading ? '로딩 중...' : '로그인'}
          {loading && <span css={spinnerStyle} />}
        </button>
        {fetchingBudget && (
          <div className="loading-container">
            <p>예산 정보를 불러오는 중...</p>
            <span css={spinnerStyle} />
          </div>
        )}
        {modalMessage.message && (
          <div className={`modal-message ${modalMessage.type}`}>
            {modalMessage.message}
          </div>
        )}
      </form>

      <p className="sign-up-prompt">
        계정이 없으신가요?{' '}
        <span className="sign-up-link" onClick={() => setIsSignupOpen(true)}>
          회원가입
        </span>
      </p>

      {isSignupOpen && (
        <SignupPage closeSignupModal={() => setIsSignupOpen(false)} />
      )}
    </div>
  );
};

export default LoginPage;
