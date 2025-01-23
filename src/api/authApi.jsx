import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // baseURL 제거 또는 빈 문자열로 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (userName, email, password) => {
  try {
    const response = await apiClient.post(
      '/api/auth/sign-up',
      { userName, email, password }, // 요청 본문
      { withCredentials: true } // 쿠키 기반 인증 포함
    );
    return response.data;
  } catch (error) {
    console.error('회원가입 요청 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 로그인 요청
export const login = async (email, password) => {
  const response = await apiClient.post('/api/auth/login', {
    email,
    password,
  });
  return response.data;
};
