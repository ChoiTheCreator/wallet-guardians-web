import { FaUserFriends } from 'react-icons/fa';
import { useFriendContext } from '../context/FriendContext';
import '../style/FriendIcon.scss';

const FriendIcon = () => {
  const { toggleFriendModal } = useFriendContext();

  return (
    <div className="friend-icon-container" onClick={toggleFriendModal}>
      <FaUserFriends className="friend-icon" />
    </div>
  );
};

export default FriendIcon;

