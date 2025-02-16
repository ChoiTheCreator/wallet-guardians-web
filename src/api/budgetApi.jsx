import apiClient from './apiClient';

// ✅ 로그인 여부 확인하는 함수
const checkAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken) {
    console.warn('🚨 인증 토큰이 없습니다. API 요청을 실행하지 않습니다.');
    return null;
  }

  return { accessToken, refreshToken };
};

// ✅ 예산 설정 (POST) - 처음 예산 설정 시 사용
export const setBudget = async (goalAmount) => {
  try {
    const auth = checkAuth();
    if (!auth) return; // 로그인 안 되어 있으면 요청 안 보냄

    console.log('🛠 예산 설정 요청 - 목표 금액:', goalAmount);
    
    const response = await apiClient.post(
      `/budget`,
      { amount: goalAmount },
      {
        headers: {
          'ACCESS-AUTH-KEY': `BEARER ${auth.accessToken}`,
          'REFRESH-AUTH-KEY': `BEARER ${auth.refreshToken || ''}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('📌 예산 설정 실패:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ 예산 조회 (GET) - 로그인 상태 확인 후 요청
export const getBudget = async () => {
  try {
    const auth = checkAuth();
    if (!auth) return 0; // 로그인 안 되어 있으면 기본값 반환

    const response = await apiClient.get('/budget');

    console.log('🛠 유저 설정예산 조회 API 응답:', response.data);
    console.log('🛠 유저 설정 내각 데이터 예산 조회 API 응답:', response.data.data);

    return response.data.data;
  } catch (e) {
    if (e.response?.status === 409 || e.response?.status === 404) {
      console.warn(`🚨 예산 데이터가 없음 (${e.response?.status}), 기본값 반환.`);
      return 0;
    }

    console.error('❌ 서버 문제로 인한 에러 발생:', e);
    throw e;
  }
};

// ✅ 예산 수정 (PUT) - 로그인 상태 확인 후 요청
export const updateBudget = async (goalAmount) => {
  try {
    const auth = checkAuth();
    if (!auth) return; // 로그인 안 되어 있으면 요청 안 보냄

    console.log('🛠 예산 수정 요청 - 목표 금액:', goalAmount);

    const response = await apiClient.put(`/budget`, { amount: goalAmount });

    return response.data;
  } catch (error) {
    console.error('❌ 예산 수정 실패:', error.response?.data || error.message);
    throw error;
  }
};
