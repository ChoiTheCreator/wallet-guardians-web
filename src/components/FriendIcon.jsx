import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa'; // 사람 아이콘 라이브러리
import '../style/FriendIcon.scss';

const FriendIcon = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/profile'); // 친구 페이지로 이동
  };

  return (
    <div className="friend-icon-container" onClick={handleNavigate}>
      <FaUserFriends className="friend-icon" />
    </div>
  );
};

export default FriendIcon;
