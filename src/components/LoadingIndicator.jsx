/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

// ✅ 스피너 애니메이션 정의 (keyframes 사용)
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ✅ 로딩 컨테이너 스타일 (더 넓게 배치 + 중앙 정렬)
const loadingContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  padding: 20px;
`;

// ✅ 스피너 스타일 (가시성 개선, 크기 증가)
const loaderStyles = css`
  display: inline-block;
  width: 40px; /* 기존 30px → 40px */
  height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid #007bff; /* ✅ 파란색으로 변경하여 가시성 증가 */
  animation: ${spinAnimation} 1s linear infinite;
`;

// ✅ 에러 텍스트 스타일 (가독성 개선)
const errorText = css`
  color: red;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 10px;
`;

// ✅ 다시 시도 버튼 스타일 (UX 개선)
const retryButton = css`
  margin-top: 10px;
  padding: 8px 15px;
  font-size: 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #cc0000;
  }
`;

const LoadingIndicator = ({ loading, error, onRetry }) => {
  if (loading) {
    return (
      <div css={loadingContainer}>
        <div css={loaderStyles}></div>
        <p style={{ color: 'blue' }}>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div css={loadingContainer}>
        <p css={errorText}>❌ 데이터를 불러오는 데 실패했습니다.</p>
        {onRetry && (
          <button css={retryButton} onClick={onRetry}>
            🔄 다시 시도
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default LoadingIndicator;
