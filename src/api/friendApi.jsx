import apiClient from './apiClient';

// ✅ 친구 추가 요청 (POST) 완료
export const sendFriendRequest = async (receiverEmail) => {
  try {
    const response = await apiClient.post(
      '/friends/requests',
      JSON.stringify({ receiverEmail }), // 📌 JSON.stringify() 추가
      {
        headers: {
          'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
          'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ 친구 요청 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 실패:', error.response?.data || error.message);
    throw error;
  }
};



// ✅ 받은 친구 요청 목록 조회 (GET) - 항상 배열 반환
export const getReceivedFriendRequests = async () => {
  try {
    const response = await apiClient.get('/friends/requests?status=requested', {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
        'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
      },
    });

    console.log('📌 받은 친구 요청 (API 응답):', JSON.stringify(response.data, null, 2));

    // ✅ 응답이 배열인지 확인하여 반환
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('🚨 받은 친구 요청 조회 실패:', error.response?.data || error.message);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

// ✅ 보낸 친구 요청 목록 조회 (GET) - 항상 배열 반환
export const getSentFriendRequests = async () => {
  try {
    const response = await apiClient.get('/friends/requests?status=pending', {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
        'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
      },
    });

    console.log('📌 보낸 친구 요청 (API 응답):', JSON.stringify(response.data, null, 2));

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('🚨 보낸 친구 요청 조회 실패:', error.response?.data || error.message);
    return [];
  }
};

// ✅ 친구 목록 조회 (GET) - 항상 배열 반환
export const getFriendsList = async () => {
  try {
    const response = await apiClient.get('/friends/requests?status=accepted', {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
        'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
      },
    });

    console.log('📌 친구 목록 (API 응답):', JSON.stringify(response.data, null, 2));

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('🚨 친구 목록 조회 실패:', error.response?.data || error.message);
    return [];
  }
};


// ✅ 친구 요청 수락 (PUT)
export const acceptFriendRequest = async (senderEmail) => {
  try {
    const response = await apiClient.put(
      '/friends/accept',
      { senderEmail },
      {
        headers: {
          'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
          'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 수락 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 요청 거절 (delete)
export const rejectFriendRequest = async (senderEmail) => {
  try {
    const response = await apiClient.delete(
      '/friends/reject',
      { senderEmail, status: 'Rejected' },
      {
        headers: {
          'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
          'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 요청 거절 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 삭제 (DELETE)
export const deleteFriend = async (deleteEmail) => {
  try {
    const response = await apiClient.delete('/friends/delete', 
        { deleteEmail },
        {headers: {
        'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
        'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
        'Content-Type': 'application/json',
      }},
    
    );
    return response.data;
  } catch (error) {
    console.error('🚨 친구 삭제 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 친구 요청 취소 (DELETE)
export const cancelFriendRequest = async (deleteEmail) => {
  try {
    const response = await apiClient.delete('/friends/cancel-request',
      { deleteEmail }, 
      {headers: {
        'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
        'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
        'Content-Type': 'application/json',
      }},
      
    );
    return response.data[0];
  } catch (error) {
    console.error('🚨 친구 요청 취소 실패:', error.response?.data || error.message);
    throw error;
  }
};




