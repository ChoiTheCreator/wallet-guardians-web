import '../style/FriendRequestModal.scss';
const FriendRequestModal = ({
  isOpen,
  onClose,
  requests,
  onAccept,
  onReject,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>친구 요청 리스트</h3>
        {requests.length > 0 ? (
          <ul className="request-list">
            {requests.map((request, index) => (
              <li key={index} className="request-item">
                <span>{request.name}</span>
                <div className="action-buttons">
                  <button
                    className="accept-button"
                    onClick={() => onAccept(request)}
                  >
                    수락
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => onReject(request)}
                  >
                    거절
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-requests">받은 친구 요청이 없습니다.</p>
        )}
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};
export default FriendRequestModal;
