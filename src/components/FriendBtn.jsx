import { useEffect, useState } from 'react';
import { useFriendContext } from '../context/FriendContext';
import { FaUserFriends } from 'react-icons/fa';
import '../style/FriendIcon.scss';

const FriendIcon = () => {
  const { receivedRequests, refreshFriendRequests, toggleFriendModal } = useFriendContext();
  const [showNotification, setShowNotification] = useState(receivedRequests.length > 0);

  // ✅ 친구 요청이 변경될 때마다 빨간 점 상태 업데이트
  useEffect(() => {
    setShowNotification(receivedRequests.length > 0);
  }, [receivedRequests]);

  // ✅ 모달을 열 때마다 친구 요청 상태 갱신 + 모달 열기
  const handleIconClick = () => {
    refreshFriendRequests(); // 최신 친구 요청 데이터 불러오기
    toggleFriendModal(); // 모달 열기/닫기
  };

  return (
    <div className="friend-icon-container" onClick={handleIconClick}>
      <FaUserFriends className="friend-icon" />
      {showNotification && <div className="notification-dot"></div>}
    </div>
  );
};

export default FriendIcon;

