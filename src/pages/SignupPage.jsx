/*eslint-disabled */
import { useState } from 'react';
import { signup } from '../api/authApi.jsx';
import '../style/SignupPage.scss';

const SignupPage = ({ closeSignupModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //성공 혹은 실패시 보여지는 모달 메시지 (객체로 초기화, 속성은 type, message)
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage({
        type: 'error',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    if (password.length < 8) {
      setModalMessage({
        type: 'error',
        message: '비밀번호는 8자 이상이어야합니다.',
      });
      return;
    }

    try {
      //매개변수
      const data = await signup(username, email, password); // 상대 경로를 사용해 API 호출
      console.log('회원가입 성공:', data);
      //성공시에는 모달메시지를 성공했다고 표시한다. type -> success, message -> 성공 ㅋ
      setModalMessage({ type: 'success', message: '회원가입에 성공했습니다!' });

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setModalMessage({
        type: 'error',
        message: '서버 오류로 회원가입에 실패했습니다.',
      });
      console.log(error);
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
          <button type="submit" className="signup-button">
            회원가입
          </button>
          {/* 모달 메시지 내의 메세지가 존재한다면 type으로 클래스 탈부착하여 메세지를 보여준다.*/}
          {modalMessage.message && (
            <div className={`modal-message ${modalMessage.type}`}>
              {modalMessage.message}
            </div>
          )}
        </form>
      </div>
      {}
    </div>
  );
};

export default SignupPage;
