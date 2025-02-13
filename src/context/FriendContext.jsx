import { createContext, useState, useContext, useEffect } from 'react';
import { getReceivedFriendRequests } from '../api/friendApi';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);
  const [receivedRequests, setReceivedRequests] = useState([]); // 🔹 받은 친구 요청 상태 추가

  const toggleFriendModal = () => {
    setFriendModalOpen((prev) => !prev);
  };

  // 🔹 받은 친구 요청 데이터를 불러와 상태 업데이트
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const receivedData = await getReceivedFriendRequests();
        console.log("📌 받은 친구 요청 (서버 응답):", receivedData);

        if (Array.isArray(receivedData)) {
          setReceivedRequests(receivedData); // ✅ 상태 업데이트
        } else {
          console.warn("⚠️ 예상치 못한 데이터 형식:", receivedData);
        }
      } catch (error) {
        console.error("🚨 친구 요청 가져오기 실패:", error);
      }
    };

    fetchReceivedRequests();
  }, []);

  return (
    <FriendContext.Provider value={{ isFriendModalOpen, toggleFriendModal, receivedRequests }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriendContext = () => {
  return useContext(FriendContext);
};
