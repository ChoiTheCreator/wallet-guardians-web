import { useState } from 'react';
import '../style/LoginPage.scss';
import SignupPage from './SignUpPage';

const LoginPage = () => {
  const [isSignupOpen, SetIsSignupOpen] = useState(false);

  const openSignupModal = () => [SetIsSignupOpen(true)];
  const closeSignupModal = () => [SetIsSignupOpen(false)];
  return (
    <div className="login-page-container">
      <h1>Login Page</h1>
      <p>로그인을 진행해주세요.</p>
      <div className="form">
        <input type="text" placeholder="아이디" className="input-field" />
        <input type="password" placeholder="비밀번호" className="input-field" />
        <button className="login-button">로그인</button>
      </div>
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
