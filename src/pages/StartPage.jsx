import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/StartPage.scss';
import accountingImage from '../IMG/accountingIMG.png';

const StartPage = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <div className={`start-page-container ${fadeIn ? 'fade-in' : ''}`}>
      <header className="header">
        <h1>Wallet Guardians</h1>
      </header>
      <main className="main-content">
        <h2 className="title">
          줄줄새는 내돈, 가계부 어플은 쓰지만 활용 안하는 나를 위한
          <br />
          나만의 가계부
        </h2>
        <p className="description">
          매일 나가는 지출, 한 눈에 보고 싶다면
          <br />
          가계부를 직접 작성해보세요.
          <br />
          그래야 가계부를 쓰는 의미가 있습니다.
        </p>

        <aside className="illustration">
          <img
            src={accountingImage}
            alt="가계부 설명 이미지"
            className="animated-image"
          />
        </aside>

        <button className="start-button" onClick={handleStartClick}>
          시작하기
        </button>
      </main>
    </div>
  );
};

export default StartPage;
