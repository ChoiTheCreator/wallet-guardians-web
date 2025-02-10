import { useState, useEffect } from 'react';
import { useFriendContext } from '../context/FriendContext';
import { FaChevronDown, FaChevronUp, FaUserPlus, FaUserCog, FaArrowLeft } from 'react-icons/fa';
import '../style/FriendModal.scss';
import {
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  getFriendsList,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
  cancelFriendRequest,
} from '../api/friendApi';

const FriendModal = () => {
  const { isFriendModalOpen, toggleFriendModal } = useFriendContext();
  const [isRequestListVisible, setIsRequestListVisible] = useState(true);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [isManagingRequests, setIsManagingRequests] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendEmail, setFriendEmail] = useState('');

  const [modalMessage, setModalMessage] = useState(null);

  // 상태 관리
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  // 모달이 열릴 때 데이터 로드
  useEffect(() => {
    if (isFriendModalOpen) {
      loadFriends();
    }
  }, [isFriendModalOpen]);

  // 데이터 로드 함수
  const loadFriends = async () => {
    try {
      const friendsData = await getFriendsList();
      const receivedData = await getReceivedFriendRequests();
      const sentData = await getSentFriendRequests();

      setFriends(friendsData || []);
      setReceivedRequests(receivedData || []);
      setSentRequests(sentData || []);
    } catch (error) {
      console.error('🚨 친구 데이터 로드 실패:', error);
    }
  };

  // 친구 추가 요청
  const handleSendRequest = async () => {
    if (!friendEmail) {
      setModalMessage({ type: 'error', message: '이메일을 입력하세요!' });
      return;
    }
  
    try {
      await sendFriendRequest(friendEmail);
      setModalMessage({ type: 'success', message: '친구 요청이 전송되었습니다!' });
  
      setFriendEmail('');
      setIsAddingFriend(false);
      loadFriends(); // 📌 요청 후 목록 다시 로드
    } catch (error) {
      setModalMessage({ type: 'error', message: '친구 요청 실패! 다시 시도하세요.' });
    }
  };

  const closeModalMessage = () => {
    setModalMessage(null);
  };

  // 친구 요청 수락
  const handleAcceptRequest = async (senderEmail) => {
    try {
      await acceptFriendRequest(senderEmail);
      alert('친구 요청을 수락했습니다.');
      loadFriends();
    } catch (error) {
      alert('친구 요청 수락 실패: ' + error.message);
    }
  };

  // 친구 요청 거절
  const handleRejectRequest = async (senderEmail) => {
    try {
      await rejectFriendRequest(senderEmail);
      alert('친구 요청을 거절했습니다.');
      loadFriends();
    } catch (error) {
      alert('친구 요청 거절 실패: ' + error.message);
    }
  };

  // 친구 삭제
  const handleDeleteFriend = async (deleteEmail) => {
    try {
      await deleteFriend(deleteEmail);
      alert('친구를 삭제했습니다.');
      loadFriends();
    } catch (error) {
      alert('친구 삭제 실패: ' + error.message);
    }
  };

  // 친구 요청 취소
  const handleCancelRequest = async (receiverEmail) => {
    try {
      await cancelFriendRequest(receiverEmail);
      alert('보낸 친구 요청을 취소했습니다.');
      loadFriends();
    } catch (error) {
      alert('친구 요청 취소 실패: ' + error.message);
    }
  };

  if (!isFriendModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={toggleFriendModal}>
          x
        </button>

        {/* ✅ 메시지 모달 (성공/실패 알림) */}
        {modalMessage && (
          <div className={`modal-message ${modalMessage.type}`}>
            <p>{modalMessage.message}</p>
            <button onClick={closeModalMessage}>확인</button>
          </div>
        )}

        {/* 🔹 친구 상세 정보 화면 */}
        {selectedFriend ? (
          <>
            <button className="back-btn" onClick={() => setSelectedFriend(null)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h2>{selectedFriend.senderEmail}</h2>
            <p><strong>이메일:</strong> {selectedFriend.senderEmail}</p>
            <div className="modal-buttons">
              <button className="delete-btn" onClick={() => handleDeleteFriend(selectedFriend.senderEmail)}>
                친구 삭제
              </button>
            </div>
          </>
        ) : isAddingFriend ? (
          <>
            <div className="add-friend-modal">
              <button className="back-btn" onClick={() => setIsAddingFriend(false)}>
                <FaArrowLeft /> 뒤로가기
              </button>
              <h3>친구 추가하기</h3>
              <div className="input-container">
                <input
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="friend-input"
                />
              </div>
              <div className="modal-buttons">
                <button className="confirm-button" onClick={handleSendRequest}>
                  추가
                </button>
                <button className="cancel-button" onClick={() => setIsAddingFriend(false)}>
                  취소
                </button>
              </div>
            </div>

          </>
        ) : isManagingRequests ? (
          <>
            <button className="back-btn" onClick={() => setIsManagingRequests(false)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h3>보낸 친구 요청 목록</h3>
            <ul className="friend-list">
              {sentRequests.map((request) => (
                <li key={request.id}>
                  {request.receiverUsername} ({request.receiverEmail})
                  <button className="cancel-request-btn" onClick={() => handleCancelRequest(request.receiverEmail)}>취소</button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {/* 🔹 아이콘 버튼 */}
            <div className="icon-buttons">
              <button className="icon-btn" onClick={() => setIsRequestListVisible(!isRequestListVisible)}>
                {isRequestListVisible ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button className="icon-btn" onClick={() => setIsAddingFriend(true)}>
                <FaUserPlus />
              </button>
              <button className="icon-btn" onClick={() => setIsManagingRequests(true)}>
                <FaUserCog />
              </button>
            </div>

            {/* 🔹 받은 친구 요청 목록 */}
            {isRequestListVisible && (
              <div className="request-list">
                <h3>받은 친구 요청</h3>
                <ul>
                  {receivedRequests.map((request) => (
                    <li key={request.id} className="request-item">
                      {request.senderEmail}
                      <div className="request-buttons">
                        <button className="accept-btn" onClick={() => handleAcceptRequest(request.senderEmail)}>수락</button>
                        <button className="reject-btn" onClick={() => handleRejectRequest(request.senderEmail)}>거절</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 🔹 친구 목록 */}
            <h2>친구 목록</h2>
            <ul className="friend-list">
              {friends.map((friend) => (
                <li key={friend.id} className="friend-item" onClick={() => setSelectedFriend(friend)}>
                  {friend.senderEmail}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendModal;
