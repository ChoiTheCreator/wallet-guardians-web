import apiClient from './apiClient';

// 예산 설정 (POST) 처음 예산 설정하는 곳에서 사용하면 됨
export const setBudget = async (goalAmount) => {
  try {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (!accessToken) throw new Error('인증 토큰이 없습니다.');

    // ✅ 기존 예산이 없으면 새로 생성
    const response = await apiClient.post(
      `/budget`,
      { amount: goalAmount },
      { headers: { 'ACCESS-AUTH-KEY': `BEARER ${accessToken}` } }
    );

    return response.data;
  } catch (error) {
    console.error('📌 예산 설정 실패:', error.response?.data || error.message);
    throw error;
  }
};

export const getBudget = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      throw new Error('🔑 Access Token이 없습니다. 로그인 상태를 확인하세요.');
    }

    console.log('📌 getBudget 요청 시작');

    const response = await apiClient.get(`/api/budget`, {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
        'REFRESH-AUTH-KEY': `BEARER ${refreshToken || ''}`,
      },
    });

    console.log('✅ getBudget 응답 데이터:', response.data);

    if (
      response.data &&
      response.data.data &&
      typeof response.data.data.amount !== 'undefined'
    ) {
      return response.data.data.amount; // ✅ 목표 금액 반환
    } else {
      console.warn('⚠ 목표 금액 데이터가 없습니다:', response.data);
      return null; // 목표 금액이 없을 경우 `null` 반환
    }
  } catch (error) {
    console.error(
      '🚨 getBudget 호출 실패:',
      error.response?.data || error.message
    );
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
