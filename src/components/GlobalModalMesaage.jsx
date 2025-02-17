/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

// 모달 애니메이션 (더 자연스럽게)
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-15px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-15px); }
`;

// 모달 스타일
const modalStyle = css`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 30px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  text-align: center;
  animation: ${fadeInOut} 3s ease-in-out forwards;
  z-index: 9999;
  min-width: 500px;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
`;

// 모달 색상 스타일
const successStyle = css`
  background-color: #28a745; /* 녹색 */
`;

const errorStyle = css`
  background-color: #dc3545; /* 빨간색 */
`;

// 아이콘 스타일
const iconStyle = css`
  font-size: 18px;
`;

// GlobalModalMessage 컴포넌트
const GlobalModalMessage = ({ type = 'success', message = '' }) => {
  if (!message) return null; // 메시지가 없으면 렌더링 X

  return (
    <div css={[modalStyle, type === 'success' ? successStyle : errorStyle]}>
      <span css={iconStyle}>{type === 'success' ? '✔️' : '❌'}</span>
      {message}
    </div>
  );
};

export default GlobalModalMessage;
