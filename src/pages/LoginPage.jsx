import { useContext, useState, useEffect } from 'react';
import '../style/LoginPage.scss';
import SignupPage from './SignupPage';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';
import { login } from '../api/authApi.jsx';

const LoginPage = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false); // 회원가입 모달 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const navigate = useNavigate();
  const { goalAmount } = useContext(GoalContext);

  // 회원가입 모달 여닫기
  const openSignupModal = () => setIsSignupOpen(true);
  const closeSignupModal = () => setIsSignupOpen(false);

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 로그인 시작 시 로딩 상태 활성화

    try {
      const data = await login(email, password);
      // const { token, refreshToken } = data;
      const { accessToken, refreshToken } = data.data;
      console.log('🔹 로그인 응답 데이터:', data); // 응답 구조 확인 디버깅용임
      console.log('🔑 저장할 accessToken:', accessToken);
      console.log('🔄 저장할 refreshToken:', refreshToken);

      //로그인 성공시 로컬스토리지에서 받아온 토큰들 저장.
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setModalMessage({
        type: 'success',
        message: '로그인 성공! 메인화면으로 이동합니다.',
      });

      setTimeout(() => {
        navigate(goalAmount && goalAmount > 0 ? '/main' : '/initial');
      }, 1500);
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

  // 모달 메시지 자동 제거
  useEffect(() => {
    if (modalMessage.message) {
      const timer = setTimeout(
        () => setModalMessage({ type: '', message: '' }),
        4000
      );
      return () => clearTimeout(timer);
    }
  }, [modalMessage]);

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
          disabled={loading} // 로딩 중 입력 필드 비활성화
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading} // 로딩 중 입력 필드 비활성화
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? '로딩 중...' : '로그인'}
        </button>
        {modalMessage.message && (
          <div className={`modal-message ${modalMessage.type}`}>
            {modalMessage.message}
          </div>
        )}
      </form>

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
