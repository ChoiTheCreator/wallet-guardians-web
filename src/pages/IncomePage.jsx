import React from 'react';
import { Link } from 'react-router-dom';
import '../style/IncomePage.scss';

const IncomePage = () => {
  const incomeDetails = [
    { date: '2025-01-01', category: '월급', amount: 3000000 },
    { date: '2025-01-10', category: '보너스', amount: 500000 },
    { date: '2025-01-15', category: '프리랜서', amount: 800000 },
    { date: '2025-01-20', category: '기타', amount: 200000 },
  ];

  return (
    <div className="income-wrapper">
      {/* 수입 내역 리스트 카드 */}
      <div className="income-list-card">
        <h2 className="income-title">수입 내역</h2>
        <table className="income-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>카테고리</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {incomeDetails.map((income, index) => (
              <tr key={index}>
                <td>{income.date}</td>
                <td>{income.category}</td>
                <td className="amount-cell">
                  {income.amount.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 상세 그래프 보기 버튼 */}
      <button className="view-chart-btn">
        <Link to="/graph">상세 그래프 보기</Link>
      </button>
    </div>
  );
};

export default IncomePage;
