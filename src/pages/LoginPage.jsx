import { useContext, useState } from 'react';
import '../style/LoginPage.scss';
import SignupPage from './SignUpPage';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';
import axios from 'axios';

const LoginPage = () => {
  const [isSignupOpen, SetIsSignupOpen] = useState(false);

  const openSignupModal = () => [SetIsSignupOpen(true)];
  const closeSignupModal = () => [SetIsSignupOpen(false)];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const serverUrl = 'http://localhost:3001/users';

  const { goalAmount } = useContext(GoalContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(serverUrl);
      const users = response.data;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setErrorMessage('');
        // 목표 금액 설정 여부에 따라 페이지 이동
        if (goalAmount && goalAmount > 0) {
          navigate('/main'); // 목표 금액이 설정된 경우 MainPage로 이동
        } else {
          navigate('/initial'); // 목표 금액이 설정되지 않은 경우 InitialPage로 이동
        }
      } else {
        setErrorMessage('아이디 혹은 비밀번호가 올바르지 않습니다.');
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('로그인서버에 오류가 발생했다.');
    }
  };

  return (
    <div className="login-page-container">
      <h1>Login Page</h1>
      <p>로그인을 진행해주세요.</p>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
