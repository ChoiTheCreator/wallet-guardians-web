import { a } from 'framer-motion/client';
import apiClient from './apiClient';
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 API URL 설정
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const signup = async (username, email, password) => {
  try {
    const response = await apiClient.post(
      '/auth/signup',
      { username, email, password } // 요청 본문
    );
    // ✅ 회원가입 후 기존 로그인 정보 삭제 ( 이렇게 하면 로컬스토리지를 이용해도 고유하게 저장이 가능함)
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshToken');
    return response.data;
  } catch (error) {
    console.error('회원가입 요청 실패:', error.response?.data || error.message);
    throw error;
  }
};

//로그아웃
export const logout = async () => {
  try {
    await apiClient.delete('/auth/logout');
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  } catch (e) {
    console.log('에러발생' + e);
  }
};

// 로그인 요청
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    console.log('🛠 로그인 API 응답:', response.data); // 응답 확인

    //API 명세서 구조가 response.data 의 또 다른 객체 구조 (data 객체에 토큰들이 들어있음)
    //이중 구조..
    const { accessToken, refreshToken } = response.data.data;

    if (accessToken && refreshToken) {
      // 🔹 로그인 성공 시 토큰을 localStorage에 저장
      localStorage.setItem('accesstoken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error(
      '📌 로그인 요청 실패:',
      error.response?.data || error.message
    );
    throw error;
  }
};

//유저 본인 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await apiClient.get('/auth/info');
    console.log('🛠 유저 정보 조회 API 응답:', response.data); // 응답 디버깅용

    //비밀번호를 제외한 나머지 데이터 Fetching
    const { id, username, email, title, defenseRate, role } =
      response.data.data;
    const { success } = response.data.success;
  } catch (e) {
    alert('서버 문제로 인한 에러발생');
    console.log('에러발생' + e);
    throw e;
  }
};
