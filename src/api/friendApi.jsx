import apiClient from './apiClient';

export const sendFriendRequest = async (receiverEmail) => {
  try {
    const response = await apiClient.post(
      '/friends/requests',
      { receiverEmail }, //헤더 제거해도 되는구만~
    );

    console.log('✅ 친구 요청 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 실패:', error.response?.data || error.message);
    throw error;
  }
};


export const getFriendsList = async () => {
  try {
    const response = await apiClient.get('/friends', {
    });

    console.log('📌 친구 목록 (API 응답):', response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.error('🚨 친구 목록 조회 실패:', error.response?.data || error.message);
    return [];
  }
};


// ✅ 보낸 친구 요청 목록 조회 (GET)
export const getSentFriendRequests = async () => {
  try {
    const response = await apiClient.get('/friends/requests/sent', {
    });

    console.log('📌 보낸 친구 요청 (API 응답):', response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.error('🚨 보낸 친구 요청 조회 실패:', error.response?.data || error.message);
    return [];
  }
};

// ✅ 받은 친구 요청 목록 조회 (GET)
export const getReceivedFriendRequests = async () => {
  try {
    const response = await apiClient.get('/friends/requests/received', {
    });

    console.log('📌 받은 친구 요청 (API 응답):', response.data.data);
    return response.data.data || [];
  } catch (error) {
    console.error('🚨 받은 친구 요청 조회 실패:', error.response?.data || error.message);
    return [];
  }
};


// ✅ 받은 친구 요청 수락 (PATCH)
export const acceptFriendRequest = async (friendStatusId) => {
  try {
    const response = await apiClient.patch(
      `/friends/requests/${friendStatusId}/accept`,
      {},
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 수락 실패:', error.response?.data || error.message);
    throw error;
  }
};


// ✅ 받은 친구 요청 거절 (PATCH)
export const rejectFriendRequest = async (friendStatusId) => {
  try {
    const response = await apiClient.patch(
      `/friends/requests/${friendStatusId}/reject`,
      {},
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 거절 실패:', error.response?.data || error.message);
    throw error;
  }
};


// ✅ 친구 삭제 (DELETE)
export const deleteFriend = async (friendListId) => {
  try {
    const response = await apiClient.delete(`/friends/${friendListId}`, {
    });

    return response.data;
  } catch (error) {
    console.error('🚨 친구 삭제 실패:', error.response?.data || error.message);
    throw error;
  }
};


// ✅ 보낸 친구 요청 취소 (DELETE)
export const cancelFriendRequest = async (friendStatusId) => {
  try {
    const response = await apiClient.delete(`/friends/requests/${friendStatusId}/cancel`, {
    });

    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 취소 실패:', error.response?.data || error.message);
    throw error;
  }
};

