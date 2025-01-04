import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedComponent = ({ children, isGoalSet }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGoalSet) {
      navigate('/initial'); // 목표 금액 설정이 안 되어 있을 때 InitialPage로 이동
    }
    //의존성 배열에 navigate 함수(위 상수 객체를 넣은것은) 리액트 컨벤션 중 하나
  }, [isGoalSet, navigate]);

  //조건에 맞으면 return children , 맞지 않으면 위의 코드로 리다이렉션ㄴ
  //여기에서의 children은 layout.jsx(공통 컴포넌트)의 자식 (navbar, hamburger, .. )을 의미함
  return children;
};

export default AuthenticatedComponent;
