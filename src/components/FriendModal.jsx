import { useState } from 'react';
import { useFriendContext } from '../context/FriendContext';
import { FaChevronDown, FaChevronUp, FaUserPlus, FaUserCog, FaArrowLeft } from 'react-icons/fa'; 
import '../style/FriendModal.scss';

const FriendModal = () => {
  const { isFriendModalOpen, toggleFriendModal } = useFriendContext();
  const [isRequestListVisible, setIsRequestListVisible] = useState(false); // 받은 친구 요청 표시 여부
  const [isAddingFriend, setIsAddingFriend] = useState(false); // 친구 추가 화면 전환
  const [isManagingRequests, setIsManagingRequests] = useState(false); // 보낸 친구 요청 목록 화면 전환
  const [selectedFriend, setSelectedFriend] = useState(null); // 선택한 친구 정보
  const [friendEmail, setFriendEmail] = useState(''); // 이메일로 친구 추가

  // 🔹 친구 목록
  const [friends, setFriends] = useState([
    { id: 1, name: '이성진', email: 'lsj0188@gmail.com', title: '쇼핑왕' },
    { id: 2, name: '정석우', email: 'jsw1234@gmail.com', title: '절약왕' }
  ]);

  // 🔹 받은 친구 요청 목록
  const [receivedRequests, setReceivedRequests] = useState([
    { id: 3, name: '서아영', email: 'Ayoung@gmail.com' },
    { id: 4, name: '최원빈', email: 'wonbin@gmail.com' }
  ]);

  // 🔹 보낸 친구 요청 목록
  const [sentRequests, setSentRequests] = useState([
    { id: 5, name: '김시온', email: 'shion@gmail.com' },
    { id: 6, name: '김수빈', email: 'subin@gmail.com' }
  ]);

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
              <button className="delete-btn" onClick={() => alert('친구를 삭제했습니다.')}>
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
              <button className="confirm-button" onClick={() => alert(`친구 요청이 ${friendEmail}님에게 전송되었습니다.`)} style={{ backgroundColor: 'navy', color: 'white' }}>
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
                  <button className="cancel-request-btn" onClick={() => alert('친구 요청이 취소되었습니다.')}>취소</button>
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
                        <button className="accept-btn" onClick={() => alert('친구 요청을 수락했습니다.')}>수락</button>
                        <button className="reject-btn" onClick={() => alert('친구 요청을 거절했습니다.')}>거절</button>
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








