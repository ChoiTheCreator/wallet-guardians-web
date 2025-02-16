import { useState, useEffect } from 'react';
import { useFriendContext } from '../context/FriendContext';
import { FaChevronDown, FaChevronUp, FaUserPlus, FaUserClock, FaArrowLeft } from 'react-icons/fa';
import GlobalModalMessage from './GlobalModalMesaage';
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
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    if (modalMessage) {
      const timer = setTimeout(() => {
        setModalMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalMessage]);

  useEffect(() => {
    if (isFriendModalOpen) {
      loadFriends();
    }
  }, [isFriendModalOpen]);

  const loadFriends = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const friendsData = await getFriendsList();
      const receivedData = await getReceivedFriendRequests();
      const sentData = await getSentFriendRequests();

      setFriends(friendsData || []);
      setReceivedRequests(receivedData || []);
      setSentRequests(sentData || []);
    } catch (error) {
      console.error('🚨 친구 데이터 로드 실패:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleSendRequest = async () => {
    if (!friendEmail) {
      setModalMessage({ type: 'error', message: '이메일을 입력하세요!' });
      return;
    }

    try {
      await sendFriendRequest(friendEmail);
      setModalMessage({ type: 'request', message: '친구 요청이 전송되었습니다!' });

      setFriendEmail('');
      setIsAddingFriend(false);
      loadFriends();
    } catch (error) {
      setModalMessage({ type: 'error', message: '친구 요청 실패! 다시 시도하세요.' });
    }
  };

  const handleAcceptRequest = async (friendStatusId) => {
    try {
      await acceptFriendRequest(friendStatusId);
      setModalMessage({ type: 'accept', message: '친구 요청을 수락했습니다!' });
      loadFriends();
    } catch (error) {
      setModalMessage({ type: 'error', message: '친구 요청 수락 실패!' });
    }
  };

  const handleRejectRequest = async (friendStatusId) => {
    try {
      await rejectFriendRequest(friendStatusId);
      setModalMessage({ type: 'reject', message: '친구 요청을 거절했습니다.' });
      loadFriends();
    } catch (error) {
      setModalMessage({ type: 'error', message: '친구 요청 거절 실패!' });
    }
  };

  const handleDeleteFriend = async (friendListId) => {
    try {
      await deleteFriend(friendListId);
      setModalMessage({ type: 'delete', message: '친구를 삭제했습니다.' });
      loadFriends();
    } catch (error) {
      setModalMessage({ type: 'error', message: '친구 삭제 실패!' });
    }
  };

  const handleCancelRequest = async (friendStatusId) => {
    try {
      await cancelFriendRequest(friendStatusId);
      setModalMessage({ type: 'reject', message: '보낸 친구 요청을 취소했습니다.' });
      loadFriends();
    } catch (error) {
      setModalMessage({ type: 'error', message: '친구 요청 취소 실패!' });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleFriendModal();
    }
  };

  if (!isFriendModalOpen) return null;

  if (isLoading) {
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      {modalMessage && <GlobalModalMessage type={modalMessage.type} message={modalMessage.message} />}

      <div className="modal-container">
        <button className="close-btn" onClick={toggleFriendModal}>
          x
        </button>

        {selectedFriend ? (
          <>
            <button className="back-btn" onClick={() => setSelectedFriend(null)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h2>{selectedFriend.friendName}</h2>
            <p><strong>이메일:</strong> {selectedFriend.friendEmail}</p>
            <div className="modal-buttons">
              <button className="delete-btn" onClick={() => handleDeleteFriend(selectedFriend.friendListId)}>
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
              {sentRequests.length > 0 ? (
                sentRequests.map((request) => (
                  <li key={request.friendStatusId}>
                    {request.receiverUsername} ({request.receiverEmail})
                    <button className="cancel-request-btn" onClick={() => handleCancelRequest(request.friendStatusId)}>취소</button>
                  </li>
                ))
              ) : (
                <p className="no-data-message">보낸 친구 요청이 없습니다.</p>
              )}
            </ul>
          </>
        ) : (
          <>
            <div className="icon-buttons">
              <button className="icon-btn" onClick={() => setIsRequestListVisible(!isRequestListVisible)}>
                {isRequestListVisible ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button className="icon-btn" onClick={() => setIsAddingFriend(true)}>
                <FaUserPlus />
              </button>
              <button className="icon-btn" onClick={() => setIsManagingRequests(true)}>
                <FaUserClock />
              </button>
            </div>

            {isRequestListVisible && (
              <div className="request-list">
                <h3>받은 친구 요청</h3>
                <ul>
                  {receivedRequests.length > 0 ? (
                    receivedRequests.map((request) => (
                      <li key={request.friendStatusId} className="request-item">
                        {request.senderUsername} ({request.senderEmail})
                        <div className="request-buttons">
                          <button className="accept-btn" onClick={() => handleAcceptRequest(request.friendStatusId)}>수락</button>
                          <button className="reject-btn" onClick={() => handleRejectRequest(request.friendStatusId)}>거절</button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="no-data-request-message">받은 친구 요청이 없습니다.</p>
                  )}
                </ul>
              </div>
            )}

            <h2>친구 목록</h2>
            <ul className="friend-list">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <li key={friend.friendListId} className="friend-item" onClick={() => setSelectedFriend(friend)}>
                    {friend.friendName} ({friend.friendEmail})
                  </li>
                ))
              ) : (
                <p className="no-data-message">친구가 아직 없습니다. 친구를 추가해 보세요!</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendModal;