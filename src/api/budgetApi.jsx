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
    const response = await apiClient.get('/budget');
    console.log('🛠 유저 설정예산 조회 API 응답:', response.data); // 응답 디버깅용
    console.log(
      '🛠 유저 설정 내각 데이터 예산 조회 API 응답:',
      response.data.data
    ); // 응답 디버깅용

    return response.data.data;
  } catch (e) {
    alert('서버 문제로 인한 에러발생');
    console.log('에러발생' + e);
    throw e;
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
