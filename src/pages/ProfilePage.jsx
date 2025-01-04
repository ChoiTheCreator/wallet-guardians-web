import React, { useState } from 'react';
import '../style/ProfilePage.scss';
import FriendAddModal from './FriendAddModal';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="profile-wrapper">
      {/* 좌측 섹션 */}
      <div className="profile-left">
        <div className="profile-avatar-card">프로필 사진 (직접 업로드)</div>
        <div className="profile-stats-card">지갑 방어율 및 칭호</div>
      </div>

      {/* 우측 섹션 */}
      <div className="profile-right">
        <h2 className="profile-title">친구 아이디 / 칭호</h2>
        <ul className="profile-friend-list">
          <li>친구 1</li>
          <li>친구 2</li>
          <li>친구 3</li>
          <li>친구 4</li>
        </ul>
        <button className="add-friend-btn" onClick={openModal}>
          친구 추가하기
        </button>
      </div>

      {/* 모달 컴포넌트 */}
      <FriendAddModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProfilePage;
