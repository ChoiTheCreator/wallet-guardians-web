/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const chartContainerStyle = css`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 1.8rem;
    color: #0055ff;
    font-weight: bold;
  }

  .total-income {
    margin-top: 20px;
    font-size: 1.4rem;
    color: #333;

    strong {
      color: #34c759;
    }
  }
`;

export const graphStyle = {
  contentStyle: {
    backgroundColor: 'white',
    border: 'none',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
  },
  itemStyle: {
    color: '#0055ff',
    fontWeight: 600,
  },
};
