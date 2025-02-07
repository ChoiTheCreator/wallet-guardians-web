import apiClient from './apiClient';

// 예산 설정 (POST) 처음 예산 설정하는 곳에서 사용하면 됨
export const setBudget = async (goalAmount) => {
  try {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('token');
    if (!userId) throw new Error('사용자 ID가 없습니다.');
    if (!accessToken) throw new Error('인증 토큰이 없습니다.');

    // ✅ 먼저 기존 예산이 있는지 확인
    const existingBudget = await apiClient.get(`/api/budget/${userId}`, {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
      },
    });

    if (existingBudget?.data) {
      // ✅ 기존 예산이 존재하면, 업데이트 요청 보내기
      console.log('📌 기존 예산이 존재하여 업데이트 진행');
      return await updateBudget(
        existingBudget.data.id,
        userId,
        goalAmount,
        new Date()
      );
    }

    // ✅ 기존 예산이 없으면 새로 생성
    const response = await apiClient.post(
      `/budget`,
      { user_id: userId, amount: goalAmount },
      { headers: { 'ACCESS-AUTH-KEY': `BEARER ${accessToken}` } }
    );

    return response.data;
  } catch (error) {
    console.error('📌 예산 설정 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 예산 조회 (GET) 전역 상태관리로 사용하면 될 듯함
export const getBudget = async (date) => {
  try {
    const response = await apiClient.get(`/api/budget/${date}`, {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
        'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('예산 조회 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 예산 수정 (PUT) 수정하는 페이지에서 사용 수정하는 페이지나 모달을 새로 만들어야 할 듯..?
export const updateBudget = async (id, userId, goalAmount, date) => {
  try {
    const response = await apiClient.put(
      `/api/budget/${id}`,
      { id, user_id: userId, budget_amount: goalAmount, date },
      {
        headers: {
          'Content-Type': 'application/json',
          'ACCESS-AUTH-KEY': `BEARER ${localStorage.getItem('accessToken')}`,
          'REFRESH-AUTH-KEY': `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('예산 수정 실패:', error.response?.data || error.message);
    throw error;
  }
};
