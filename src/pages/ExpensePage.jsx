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
import '../style/ExpensePage.scss';

const ExpensePage = () => {
  // **더미 데이터 생성 (지출 현황)**
  const expenseData = [
    { category: '식비', value: 80_000 },
    { category: '교통비', value: 40_000 },
    { category: '쇼핑', value: 120_000 },
    { category: '기타', value: 60_000 },
  ];

  const totalExpenses = expenseData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="expense-wrapper">
      {/* 좌측 섹션 */}
      <div className="expense-left">
        <div className="expense-summary-card">
          <h3>지출 현황 그래프</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData} barGap={10}>
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
              <Bar dataKey="value" fill="#ff4d4d" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="total-expenses">
            총 지출: <strong>{totalExpenses.toLocaleString()}원</strong>
          </p>
        </div>
      </div>

      {/* 우측 섹션: 지출 리스트 */}
      <div className="expense-right">
        <h2 className="expense-title">지출 리스트</h2>
        <div className="expense-list-card">
          <table className="expense-table">
            <thead>
              <tr>
                <th>카테고리</th>
                <th>금액</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.category}</td>
                  <td>{expense.value.toLocaleString()}원</td>
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

export default ExpensePage;
