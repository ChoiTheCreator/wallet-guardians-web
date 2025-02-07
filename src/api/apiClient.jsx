// apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 API URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청에 localStorage에서 토큰을 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('🔹 API 요청 보냄: ', config.url);
    console.log('🔑 ACCESS-AUTH-KEY:', accessToken);
    console.log('🔄 REFRESH-AUTH-KEY:', refreshToken);

    if (accessToken) {
      config.headers['ACCESS-AUTH-KEY'] = `BEARER ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['REFRESH-AUTH-KEY'] = `BEARER ${refreshToken}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 즉시 로그아웃 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
