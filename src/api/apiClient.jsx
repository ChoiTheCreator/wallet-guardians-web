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
    const accessToken = localStorage.getItem('token');
    // refreshToken은 사용하지 않으므로 제외하거나 필요에 따라 별도로 사용할 수 있습니다.
    if (accessToken) {
      config.headers['ACCESS-AUTH-KEY'] = `BEARER ${accessToken}`;
    }
    // FormData 전송일 경우 Content-Type을 자동 설정 (multipart/form-data로)
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 바로 로그아웃 처리 (토큰 갱신 로직 제거)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      // 여기서 refresh 로직을 제거하고, 즉시 토큰을 제거하고 로그인 페이지로 이동하도록 처리합니다.
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
