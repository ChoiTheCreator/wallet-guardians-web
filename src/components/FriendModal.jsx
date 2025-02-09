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
  const [isRequestListVisible, setIsRequestListVisible] = useState(false);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [isManagingRequests, setIsManagingRequests] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendEmail, setFriendEmail] = useState('');

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

      setFriends(friendsData || []); // ⬅ undefined 방지
      setReceivedRequests(receivedData || []);
      setSentRequests(sentData || []);
    } catch (error) {
      console.error('🚨 친구 데이터 로드 실패:', error);
    }
  };

  // 친구 추가 요청
  const handleSendRequest = async () => {
    if (!friendEmail) {
      alert('이메일을 입력하세요.');
      return;
    }
    try {
      await sendFriendRequest(friendEmail);
      alert(`친구 요청이 ${friendEmail}님에게 전송되었습니다.`);
      setFriendEmail('');
      setIsAddingFriend(false);
      loadFriends(); // 데이터 다시 로드
    } catch (error) {
      alert('친구 요청 실패: ' + error.message);
    }
  };

  // 친구 요청 수락
  const handleAcceptRequest = async (friendId) => {
    try {
      await acceptFriendRequest(friendId);
      alert('친구 요청을 수락했습니다.');
      loadFriends(); // 데이터 다시 로드
    } catch (error) {
      alert('친구 요청 수락 실패: ' + error.message);
    }
  };

  // 친구 요청 거절
  const handleRejectRequest = async (friendId) => {
    try {
      await rejectFriendRequest(friendId);
      alert('친구 요청을 거절했습니다.');
      loadFriends(); // 데이터 다시 로드
    } catch (error) {
      alert('친구 요청 거절 실패: ' + error.message);
    }
  };

  // 친구 삭제
  const handleDeleteFriend = async (friendEmail) => {
    try {
      await deleteFriend(friendEmail);
      alert('친구를 삭제했습니다.');
      loadFriends(); // 데이터 다시 로드
    } catch (error) {
      alert('친구 삭제 실패: ' + error.message);
    }
  };

  // 친구 요청 취소
  const handleCancelRequest = async (friendEmail) => {
    try {
      await cancelFriendRequest(friendEmail);
      alert('보낸 친구 요청을 취소했습니다.');
      loadFriends(); // 데이터 다시 로드
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

        {/* 🔹 친구 상세 정보 화면 */}
        {selectedFriend ? (
          <>
            <button className="back-btn" onClick={() => setSelectedFriend(null)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h2>{selectedFriend.name}</h2>
            <p><strong>이메일:</strong> {selectedFriend.email}</p>
            <p><strong>칭호:</strong> {selectedFriend.title}</p>
            <div className="modal-buttons">
              <button className="profile-btn">프로필 보기</button>
              <button className="delete-btn" onClick={() => handleDeleteFriend(selectedFriend.email)}>
                친구 삭제
              </button>
            </div>
          </>
        ) : isAddingFriend ? (
          <>
            <button className="back-btn" onClick={() => setIsAddingFriend(false)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h3 style={{ color: 'navy' }}>친구 추가하기</h3>
            <input
              type="email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleSendRequest} style={{ backgroundColor: 'navy', color: 'white' }}>
                추가
              </button>
              <button className="cancel-button" onClick={() => setIsAddingFriend(false)}>취소</button>
            </div>
          </>
        ) : isManagingRequests ? (
          <>
            <button className="back-btn" onClick={() => setIsManagingRequests(false)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h3 style={{ color: 'navy' }}>보낸 친구 요청 목록</h3>
            <ul className="friend-list">
              {sentRequests.map((request) => (
                <li key={request.id}>
                  {request.name} ({request.email})
                  <button className="cancel-request-btn" onClick={() => handleCancelRequest(request.email)}>취소</button>
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
                      {request.name} ({request.email})
                      <div className="request-buttons">
                        <button className="accept-btn" onClick={() => handleAcceptRequest(request.id)}>수락</button>
                        <button className="reject-btn" onClick={() => handleRejectRequest(request.id)}>거절</button>
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
                  {friend.name} ({friend.email})
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