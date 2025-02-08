import apiClient from './apiClient';

// ✅ 공통 헤더
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken) throw new Error('🔑 Access Token이 없습니다.');

  return {
    'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
    'REFRESH-AUTH-KEY': `BEARER ${refreshToken || ''}`,
    'Content-Type': 'application/json',
  };
};

// ✅ 친구 추가 요청 (POST)
export const sendFriendRequest = async (receiverEmail) => {
  try {
    const response = await apiClient.post(
      '/api/friends/requests',
      { receiverEmail },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 보낸 친구 요청 목록 조회 (GET)
export const getSentFriendRequests = async () => {
  try {
    const response = await apiClient.get('/api/friends/requests?status=pending', {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error('🚨 보낸 친구 요청 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 받은 친구 요청 목록 조회 (GET)
export const getReceivedFriendRequests = async () => {
  try {
    const response = await apiClient.get('/api/friends/requests?status=requested', {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error('🚨 받은 친구 요청 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 목록 조회 (GET)
export const getFriendsList = async () => {
  try {
    const response = await apiClient.get('/api/friends/requests?status=accepted', {
      headers: getAuthHeaders(),
    });
    return response.data.data;
  } catch (error) {
    console.error('🚨 친구 목록 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 요청 수락 (PUT)
export const acceptFriendRequest = async (friendId) => {
  try {
    const response = await apiClient.put(
      '/api/friends/managements',
      { friendId, status: 'Accepted' },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 수락 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 요청 거절 (PUT)
export const rejectFriendRequest = async (friendId) => {
  try {
    const response = await apiClient.put(
      '/api/friends/managements',
      { friendId, status: 'Rejected' },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 거절 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 삭제 (DELETE)
export const deleteFriend = async (friendEmail) => {
  try {
    const response = await apiClient.delete('/api/friends/delete', {
      headers: getAuthHeaders(),
      data: { senderEmail: friendEmail },
    });
    return response.data;
  } catch (error) {
    console.error('🚨 친구 삭제 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 요청 취소 (DELETE)
export const cancelFriendRequest = async (friendEmail) => {
  try {
    const response = await apiClient.delete('/api/friends/cancel-request', {
      headers: getAuthHeaders(),
      data: { senderEmail: friendEmail },
    });
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 취소 실패:', error.response?.data || error.message);
    throw error;
  }
};



