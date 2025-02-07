import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';

const AuthenticatedComponent = ({ children }) => {
  const { goalAmount, loading } = useContext(GoalContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loading && goalAmount === null) {
  //     console.log('님아 설정 안하심 ㅋㅋ ㅅㄱㅇ');
  //     navigate('/goal-setting'); // ✅ 목표 금액이 없으면 목표 설정 페이지로 이동
  //   }
  // }, [goalAmount, loading, navigate]);

  return children;
};

export default AuthenticatedComponent;
