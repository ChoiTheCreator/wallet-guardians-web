import { useState } from 'react';
import { useFriendContext } from '../context/FriendContext';
import { FaTimes, FaChevronDown, FaChevronUp, FaUserPlus, FaUserCog, FaArrowLeft } from 'react-icons/fa'; // 뒤로가기 아이콘 추가
import '../style/FriendModal.scss';

const FriendModal = () => {
  const { isFriendModalOpen, toggleFriendModal } = useFriendContext();
  const [isListVisible, setIsListVisible] = useState(true);
  const [isAddingFriend, setIsAddingFriend] = useState(false); // 친구 추가 화면 전환 
  const [friendId, setFriendId] = useState(''); // 아이디로 친구 추가

  if (!isFriendModalOpen) return null;

  const handleInputChange = (e) => setFriendId(e.target.value);

  const handleSubmit = () => {
    if (friendId.trim()) {
      alert(`친구 아이디 "${friendId}"가 추가되었습니다!`);
      setFriendId('');
      setIsAddingFriend(false); // 친구 추가 완료 후 다시 목록 화면으로 전환
    } else {
      alert('아이디를 입력해 주세요!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={toggleFriendModal}>
          <FaTimes />
        </button>

        {isAddingFriend ? (
          <>
            <button className="back-btn" onClick={() => setIsAddingFriend(false)}>
              <FaArrowLeft /> 뒤로가기
            </button>
            <h3 style={{ color: 'navy' }}>친구 추가하기</h3>
            <input
              type="text"
              value={friendId}
              onChange={handleInputChange}
              placeholder="친구 아이디를 입력하세요"
            />
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleSubmit} style={{ backgroundColor: 'navy', color: 'white' }}>
                추가
              </button>
              <button className="cancel-button" onClick={() => setIsAddingFriend(false)}>
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="close-btn" onClick={toggleFriendModal}>×</button>
            <h2>친구 목록</h2>

            {/* 🔹 아이콘 버튼 (친구 추가, 친구 관리, 목록 접기) */}
            <div className="icon-buttons">
              <button className="icon-btn" onClick={() => setIsAddingFriend(true)}>
                <FaUserPlus />
              </button>
              <button className="icon-btn">
                <FaUserCog />
              </button>
              <button className="icon-btn" onClick={() => setIsListVisible(!isListVisible)}>
                {isListVisible ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {/* 🔹 친구 목록 */}
            <ul className={`friend-list ${isListVisible ? 'show' : 'hide'}`}>
              <li>📱 일성진 (온라인)</li>
              <li>💻 이성진 (오프라인 1시간 전)</li>
              <li>💻 삼성진 (오프라인 2개월 전)</li>
              <li>📱 사성진 (오프라인 3년 전)</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendModal;



