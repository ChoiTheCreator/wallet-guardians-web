import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // baseURL 제거 또는 빈 문자열로 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (username, email, password) => {
  try {
    const response = await apiClient.post(
      '/api/auth/sign-up',
      { username, email, password } // 요청 본문
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

//로그인, 사인업 함수 제외 한 모든 api function에는 헤더 두줄이 들어가야함
