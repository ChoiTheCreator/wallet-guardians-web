import { createContext, useState, useContext } from 'react';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [isFriendModalOpen, setFriendModalOpen] = useState(false);

  const toggleFriendModal = () => {
    setFriendModalOpen((prev) => !prev);
  };

  return (
    <FriendContext.Provider value={{ isFriendModalOpen, toggleFriendModal }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriendContext = () => {
  return useContext(FriendContext);
};