import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/main'); // 메인 페이지로 이동
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>찾을 수 없는 페이지입니다!</p>
      <p>요청하신 페이지가 존재하지 않거나 잘못된 경로입니다.</p>
      <button className="go-home-btn" onClick={handleGoHome}>
        홈으로 이동
      </button>
    </div>
  );
};

export default NotFoundPage;
