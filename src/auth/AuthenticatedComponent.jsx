import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoalContext } from '../context/GoalContext';

const AuthenticatedComponent = ({ children }) => {
  const { goalAmount, loading } = useContext(GoalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    //로그인이 완료된 상태라면 메인페이지에 들어갈 권한이 생김
    const accessToken = localStorage.getItem('accessToken');

    //로그인이 되어있지 않은 상태일 경우 block
    if (!accessToken) {
      console.log('로그인이 필요합니다!');
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다');
      navigate('/login');
      return; //여기에 왜 계속 return을 집어 넣는 이유 -> 안전한 방식 (로그인을 하지 않았떠면 Authen 컴포가 켜지면안됌)
    }

    //로그인은 되었지만, 예산 설정이 아직 안되어있는 경우
    if (!goalAmount) {
      console.log('목표금액 설정 하지 않았음. 리다이렉션');
      alert('목표금액을 설정해주세요. 목표금액 설정 페이지로 이동합니다 ');
      navigate('/goal-setting');
    }
  }, [goalAmount, loading, navigate]);

  return children;
};

export default AuthenticatedComponent;
