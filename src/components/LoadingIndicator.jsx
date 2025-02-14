/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const loadingContainer = css`
  text-align: center;
  margin: 20px 0;
`;

const loaderStyles = css`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const errorText = css`
  color: red;
  font-size: 1rem;
  font-weight: bold;
`;

const LoadingIndicator = ({ loading, error, onRetry }) => {
  if (loading) {
    return (
      <div css={loadingContainer}>
        <div css={loaderStyles}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div css={loadingContainer}>
        <p css={errorText}>❌ 유저 정보를 불러올 수 없습니다.</p>
        {onRetry && <button onClick={onRetry}>🔄 다시 시도</button>}
      </div>
    );
  }

  return null;
};

export default LoadingIndicator;
