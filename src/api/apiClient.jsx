import axios from 'axios';

// Axios 인스턴스

const apiClient = axios.create({
  baseURL: '', // 프록시 설정을 사용할 때는 빈 문자열 유지
  headers: {
    'Content-Type': 'application/json',
  },
});

// 리프레시 토큰으로 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('token');
    if (!refreshToken) {
      throw new Error('Refresh Token이 없습니다.');
    }

    const response = await axios.post(
      '/api/auth/refresh',
      {},
      {
        headers: {
          //시온님이 강조하신 헤더 전송 방식( 로그인 ,사인업 제외 모든 곳에 헤더 포함 보내야함)
          'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
          'REFRESH-AUTH-KEY': `BEARER ${refreshToken}`,
        },
      }
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    if (newAccessToken) localStorage.setItem('token', newAccessToken);
    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error(
      '리프레시 토큰 갱신 실패:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      config.headers['ACCESS-AUTH-KEY'] = `BEARER ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['REFRESH-AUTH-KEY'] = `BEARER ${refreshToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['ACCESS-AUTH-KEY'] = `BEARER ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
