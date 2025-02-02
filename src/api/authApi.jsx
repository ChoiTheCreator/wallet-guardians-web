import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 API URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (username, email, password) => {
  try {
    const response = await apiClient.post(
      '/api/auth/signup',
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
  try {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('로그인 요청 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 로그인, 사인업 함수 제외한 모든 API function에 헤더 추가
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Custom-Header': 'YourCustomHeaderValue',
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      '데이터 가져오기 실패:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Custom-Header': 'YourCustomHeaderValue',
      },
    });
    return response.data;
  } catch (error) {
    console.error('데이터 전송 실패:', error.response?.data || error.message);
    throw error;
  }
};
