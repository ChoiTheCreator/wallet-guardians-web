import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import '../style/StartPage.scss';

const StartPage = () => {
  const navigate = useNavigate(); // useNavigate 초기화

  const handleStartClick = () => {
    navigate('/login'); // LoginPage로 라우팅
  };

  return (
    <div className="start-page-container">
      <header className="header">
        <h1>Wallet Guardians</h1>
      </header>
      <main className="main-content">
        <h2 className="title">
          줄줄새는 내돈, 가계부 어플은 쓰지만 활용 안하는 날 위한
          <br />
          나만의 가계부
        </h2>
        <p className="description">
          매일 나가는 지출, 한 눈에 보고싶다면
          <br />
          가계부를 직접 작성해보세요.
          <br />
          그래야 가계부를 쓰는 의미가 있습니다.
        </p>
        <button className="start-button" onClick={handleStartClick}>
          시작하기
        </button>
      </main>
      <aside className="illustration">
        <img src="illustration.svg" alt="가계부 설명 이미지" />
      </aside>
      <footer className="footer">
        <p>Wallet Guardians</p>
      </footer>
    </div>
  );
};

export default StartPage;
