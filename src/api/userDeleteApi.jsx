import apiClient from './apiClient';

export const deleteUserAccount = async () => {
  try {
    const response = await apiClient.delete('/auth/delete', {
    });

    console.log('회원 탈퇴 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('🚨 회원 탈퇴 실패:', error.response?.data || error.message);
    throw error;
  }
};
