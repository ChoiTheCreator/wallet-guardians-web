import axios from 'axios';

// Axios 인스턴스 생성
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
    if (!refreshToken) {
      throw new Error('Refresh Token이 없습니다.');
    }

    // 리프레시 토큰 요청
    const response = await axios.post(
      '/api/auth/refresh', // 프록시를 통해 서버로 전달
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true, // 쿠키 기반 인증을 사용할 경우 추가
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새 토큰 저장
    if (accessToken) localStorage.setItem('token', accessToken);
    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
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
    const token = localStorage.getItem('token'); // Access Token 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response, // 성공적인 응답 그대로 반환
  async (error) => {
    const originalRequest = error.config; // 실패한 요청 정보 저장

    // 401 에러 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 동일 요청 무한 반복 방지

      try {
        // 새 Access Token 발급
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 새 토큰 추가
        return apiClient(originalRequest); // 수정된 요청 재시도
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);

        // 토큰 삭제 및 리다이렉트
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    // 다른 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default apiClient;
