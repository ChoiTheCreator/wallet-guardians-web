import apiClient from './apiClient';

// 프로필 데이터 가져오기
export const getProfile = async () => {
  const response = await apiClient.get('/profile');
  return response.data;
};

// 목표 금액 업데이트
export const updateGoalAmount = async (goalAmount) => {
  const response = await apiClient.put('/goal', { goalAmount });
  return response.data;
};
