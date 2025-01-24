/*eslint-disabled */
import { useState } from 'react';
import { signup } from '../api/authApi.jsx';
import '../style/SignupPage.scss';

const SignupPage = ({ closeSignupModal }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
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

    try {
      const data = await signup(userName, email, password); // 상대 경로를 사용해 API 호출
      console.log('회원가입 성공:', data);
      setSuccessMessage('회원가입이 완료되었습니다!');

      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      setErrorMessage('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-page-overlay">
      <div className="signup-page-container">
        <button className="close-button" onClick={closeSignupModal}>
          ✕
        </button>
        <h1>회원가입</h1>
        <p>새 계정을 생성하세요.</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="이름"
            className="input-field"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
