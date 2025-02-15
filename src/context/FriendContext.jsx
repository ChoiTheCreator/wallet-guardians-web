import { createContext, useState, useContext, useEffect } from 'react';
import { getReceivedFriendRequests } from '../api/friendApi';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ 로그인 여부 확인 (토큰 존재 여부 체크)
  const isAuthenticated = !!localStorage.getItem('accessToken');

  // ✅ 친구 요청 목록 불러오기
  const refreshFriendRequests = async () => {
    if (!isAuthenticated) {
      console.warn("🚨 [FriendContext] 로그인되지 않음. 친구 요청을 가져오지 않음.");
      setLoading(false);
      return;
    }

    try {
      console.log('📡 친구 요청 GET 요청 보내는 중...');
      const receivedData = await getReceivedFriendRequests();

      if (Array.isArray(receivedData)) {
        console.log('✅ 받은 친구 요청 (서버 응답):', receivedData);
        setReceivedRequests(receivedData);
      } else {
        console.warn('⚠️ 예상치 못한 데이터 형식:', receivedData);
        setReceivedRequests([]);
      }
    } catch (error) {
      console.error('🚨 친구 요청 가져오기 실패:', error);
      setReceivedRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 친구 모달 토글 함수
  const toggleFriendModal = () => {
    setFriendModalOpen((prev) => !prev);
  };

  // ✅ 로그인된 경우에만 친구 요청 데이터 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      refreshFriendRequests();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <FriendContext.Provider value={{ receivedRequests, refreshFriendRequests, isFriendModalOpen, toggleFriendModal, loading }}>
      {children}
    </FriendContext.Provider>
  );
};

// ✅ 커스텀 훅
export const useFriendContext = () => {
  return useContext(FriendContext);
};
