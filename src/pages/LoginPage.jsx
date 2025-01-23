import { useContext, useState } from 'react';
import '../style/LoginPage.scss';
import SignupPage from './SignupPage';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';
import { login } from '../api/authApi.jsx'; // 로그인 API 호출

const LoginPage = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false); // 회원가입 모달 상태
  const [email, setEmail] = useState(''); // 이메일 입력 값
  const [password, setPassword] = useState(''); // 비밀번호 입력 값
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지

  const navigate = useNavigate();
  const { goalAmount } = useContext(GoalContext); // 목표 금액 상태 (컨텍스트 사용)

  // 회원가입 모달 열기
  const openSignupModal = () => setIsSignupOpen(true);

  // 회원가입 모달 닫기
  const closeSignupModal = () => setIsSignupOpen(false);

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      // API 요청 보내기
      const data = await login(email, password);
      const { token, refreshToken } = data;

      // 토큰 저장
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      setErrorMessage(''); // 에러 메시지 초기화

      // 목표 금액 설정 여부에 따라 페이지 이동
      if (goalAmount && goalAmount > 0) {
        navigate('/main'); // 목표 금액이 설정된 경우
      } else {
        navigate('/initial'); // 목표 금액이 설정되지 않은 경우
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      // 에러 메시지 설정
      setErrorMessage(
        error.response?.data?.message ||
          '아이디 혹은 비밀번호가 올바르지 않습니다.'
      );
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
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="sign-up-prompt">
        계정이 없으신가요?{' '}
        <span className="sign-up-link" onClick={openSignupModal}>
          회원가입
        </span>
      </p>

      {isSignupOpen && <SignupPage closeSignupModal={closeSignupModal} />}
    </div>
  );
};

export default LoginPage;
