import { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { useFriendContext } from '../context/FriendContext';
import '../style/FriendIcon.scss';

const FriendIcon = () => {
  const { toggleFriendModal, receivedRequests = [] } = useFriendContext(); // 기본값으로 빈 배열 설정
  const [hasRequests, setHasRequests] = useState(false);

  // ✅ 받은 친구 요청 상태 업데이트
  useEffect(() => {
    console.log("📌 현재 받은 친구 요청:", receivedRequests);
    setHasRequests(receivedRequests.length > 0); // 상태 업데이트
  }, [receivedRequests]); // receivedRequests가 변경될 때만 실행

  return (
    <div className="friend-icon-container" onClick={toggleFriendModal}>
      <FaUserFriends className="friend-icon" />
      {/* 🔴 받은 친구 요청이 있을 경우 빨간 점 표시 */}
      {hasRequests && <div className="notification-dot"></div>}
    </div>
  );
};

export default FriendIcon;
