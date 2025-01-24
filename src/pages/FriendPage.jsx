import React, { useState } from 'react';
import FriendAddModal from './FriendAddModal'; // 친구 추가 모달
import FriendRequestModal from './FriendRequestModal'; // 친구 요청 모달
import '../style/FriendPage.scss';

const FriendPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const [friendRequests, setFriendRequests] = useState([
    { name: '친구 A' },
    { name: '친구 B' },
    { name: '친구 C' },
  ]); // 친구 요청 리스트 초기값 샘플

  // 모달 열기/닫기
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openRequestModal = () => setIsRequestModalOpen(true);
  const closeRequestModal = () => setIsRequestModalOpen(false);

  // 친구 요청 수락
  const handleAcceptRequest = (request) => {
    alert(`${request.name}의 친구 요청을 수락했습니다.`);
    setFriendRequests((prev) => prev.filter((r) => r.name !== request.name));
  };

  // 친구 요청 거절
  const handleRejectRequest = (request) => {
    alert(`${request.name}의 친구 요청을 거절했습니다.`);
    setFriendRequests((prev) => prev.filter((r) => r.name !== request.name));
  };

  return (
    <div className="friend-page-container">
      <h1>친구 목록</h1>
      
      <span className="freind-text">친구를 추가하여 경쟁해 보세요!</span>

      {/* 친구 목록 */}
      <div className="friend-list">
        <div className="friend-item">친구 1</div>
        <div className="friend-item">친구 2</div>
        <div className="friend-item">친구 3</div>
        <div className="friend-item">친구 4</div>
        <div className="friend-item">친구 5</div>
      </div>

      {/* 버튼 그룹 */}
      <div className="button-group">
        <button className="add-friend-button" onClick={openAddModal}>
          친구 추가하기
        </button>
        <button className="request-friend-button" onClick={openRequestModal}>
          친구 수락하기
        </button>
      </div>

      {/* 친구 추가 모달 */}
      <FriendAddModal isOpen={isAddModalOpen} onClose={closeAddModal} />

      {/* 친구 요청 모달 */}
      <FriendRequestModal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
        requests={friendRequests}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
      />
    </div>
  );
};

export default FriendPage;
