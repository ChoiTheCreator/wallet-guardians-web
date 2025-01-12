import { useState } from 'react';
import axios from 'axios'; // axios import
import '../style/SignupPage.scss';

const SignupPage = ({ closeSignupModal }) => {
  //서버에 전송 및 db 저장할 녀석들을 state로 담는다 (1단계)
  const [username, setUsername] = useState('');
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

    const newUser = { username, email, password };

    try {
      //여기서 newUser라는 객체와 함께보내는 메타데이터(headers 속성 -> Content-Type : 'application.json' json 형태로 보내겠다는것)
      const response = await axios.post(
        'http://localhost:4000/users',
        newUser,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 201) {
        setSuccessMessage('회원가입이 완료되었습니다!');
        //회원가입 성공시 나머지 입력칸 초기화
        setErrorMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage('회원가입에 실패했습니다.');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('서버오류 발생.');
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
            placeholder="아이디"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
