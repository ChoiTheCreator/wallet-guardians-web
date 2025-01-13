import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import '../style/ExpensePage.scss'; // ExpensePage 스타일 재사용

const IncomePage = () => {
  // **수입 데이터 생성**
  const incomeData = [
    { category: '월급', value: 3_000_000 },
    { category: '보너스', value: 500_000 },
    { category: '프리랜서', value: 800_000 },
    { category: '기타', value: 200_000 },
  ];

  const totalIncome = incomeData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="expense-wrapper">
      {/* 좌측 섹션 */}
      <div className="expense-left">
        <div className="expense-summary-card">
          <h3>수입 현황 그래프</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 14 }} />
              <YAxis tick={{ fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                }}
                itemStyle={{ color: '#001f5c', fontWeight: 600 }}
              />
              <Bar dataKey="value" fill="#34c759" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="total-expenses">
            총 수입: <strong>{totalIncome.toLocaleString()}원</strong>
          </p>
        </div>
      </div>

      {/* 우측 섹션: 수입 리스트 */}
      <div className="expense-right" style={{ maxWidth: '600px' }}>
        {' '}
        {/* 가로 너비 조정 */}
        <h2 className="expense-title">수입 리스트</h2>
        <div className="expense-list-card">
          <table className="expense-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>금액</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {incomeData.map((income, index) => (
                <tr key={index}>
                  <td>{income.category}</td>
                  <td className="amount-cell">
                    {income.value.toLocaleString()}원
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomePage;
