/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const tableContainerStyle = css`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .income-title {
    font-size: 1.8rem;
    color: #0055ff;
    font-weight: bold;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;

    th,
    td {
      padding: 16px;
      border-bottom: 2px solid #f0f0f0;
    }

    th {
      background-color: #f5f9ff;
      font-weight: bold;
      color: #0055ff;
    }

    td {
      font-size: 1.2rem;
      color: #333;
    }

    .amount-cell {
      font-weight: bold;
      color: #34c759;
    }
  }
`;
