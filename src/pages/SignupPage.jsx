/*eslint-disable */
import React, { useState } from 'react';
import '../style/SignupPage.scss';

const SignupPage = ({ closeSignupModal }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    setErrorMessage('');
    console.log('회원가입 완료');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(''); // 에러 초기화
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage(''); // 에러 초기화
  };

  return (
    <div className="signup-page-overlay ">
      <div className="signup-page-container">
        <button className="close-button" onClick={closeSignupModal}>
          ✕
        </button>
        <h1>회원가입</h1>
        <p>새 계정을 생성하세요.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="아이디"
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="이메일"
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="input-field"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="input-field"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
