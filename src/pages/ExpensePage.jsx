/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { getExpenseByMonth } from '../api/expenseApi';
import LoadingIndicator from '../components/LoadingIndicator';

// ✅ 공통 스타일 (그래프 & 테이블 통합)
const pageWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 20px;
    gap: 15px;
  }
`;

const contentCard = css`
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
  }
`;

const expenseLeft = css`
  flex: 1;
  min-width: 60%;
  @media (max-width: 1000px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const expenseRight = css`
  flex: 1;
  min-width: 35%;
  @media (max-width: 1000px) {
    display: none; // 작은 화면에서는 소비 테이블 숨김
  }
`;

const tableContainer = css`
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const expenseTable = css`
  width: 300px;
  border-collapse: collapse;
  text-align: center;
  font-size: 1.1rem;

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
    color: #001f5c;
  }

  tr:hover {
    background-color: #f8f8f8;
  }
`;

const ExpensePage = () => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [animatedExpenseData, setAnimatedExpenseData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        console.log(
          `📢 ${currentYear}년 ${currentMonth}월 지출 데이터를 불러옵니다.`
        );

        const response = await getExpenseByMonth(currentYear, currentMonth);
        const expenseDataArray = response.data;

        if (Array.isArray(expenseDataArray)) {
          setExpenseItems(expenseDataArray);
          setTotalExpenses(
            expenseDataArray.reduce((acc, cur) => acc + cur.amount, 0)
          );
        } else {
          console.warn(
            '🚨 서버에서 받은 데이터가 배열이 아닙니다:',
            expenseDataArray
          );
        }
      } catch (error) {
        setError(error);
        console.error('❌ 지출 데이터를 불러오는 데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  //  카테고리별 지출 데이터 그룹화 (reduce 사용)
  const groupedExpenses = expenseItems.reduce((acc, cur) => {
    if (!acc[cur.category]) {
      acc[cur.category] = { category: cur.category, value: 0 };
    }
    acc[cur.category].value += cur.amount;
    return acc;
  }, {});

  // 객체를 배열로 변환하여 그래프에서 사용 가능하게 조정
  const expenseData = Object.values(groupedExpenses);

  //  애니메이션 효과 적용 (로딩 완료 후 실행)
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setAnimatedExpenseData(expenseData);
      }, 250); // 0.3초 후 실행 (부드러운 시작 효과)
      return () => clearTimeout(timeout);
    }
  }, [expenseData, loading]);

  return (
    <div css={pageWrapper}>
      {/*  로딩 화면 추가 */} 
      {loading ? (
        <LoadingIndicator loading={loading} error={error} />
      ) : (
        <>
          {/* ✅ 좌측 섹션: 지출 그래프 */}
          <div css={expenseLeft}>
            <div css={contentCard}>
              <h3>지출 현황 그래프</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={animatedExpenseData} barGap={10}>
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

          {/* ✅ 우측 섹션: 지출 리스트 */}
          <div css={expenseRight}>
            <div css={tableContainer}>
              <h3>지출 리스트</h3>
              <table css={expenseTable}>
                <thead>
                  <tr>
                    <th>카테고리</th>
                    <th>금액</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData.length > 0 ? (
                    expenseData.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.category}</td>
                        <td>{expense.value.toLocaleString()}원</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpensePage;
