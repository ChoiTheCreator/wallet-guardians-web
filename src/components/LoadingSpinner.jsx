/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

// 스피너 애니메이션 (더 부드럽게 회전)
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 스타일 설정
const spinnerWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  opacity: 1 !important;
  animation: none;
`;

const spinnerStyle = (size, color) => css`
  width: ${size}px;
  height: ${size}px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const textStyle = css`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400 !important;
  color: #fff !important;
  opacity: 0.8;
`;

// ✅ 로딩 스피너 컴포넌트
const LoadingSpinner = ({
  text = '로딩 중...',
  size = 32,
  color = '#ffffff',
}) => {
  return (
    <div css={spinnerWrapperStyle}>
      <div css={spinnerStyle(size, color)} />
      <p css={textStyle}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
