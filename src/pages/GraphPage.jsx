import { useContext, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';
import { GoalContext } from '../context/GoalContext';
import '../style/GraphPage.scss';
import { SidebarContext } from '../context/SidebarContext';
import { getExpenseByMonth } from '../api/expenseApi';
import LoadingIndicator from '../components/LoadingIndicator';

const GraphPage = () => {
  const { goalAmount } = useContext(GoalContext);
  const { isSidebarOpen } = useContext(SidebarContext);

  const [expenseItems, setExpenseItems] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 초기값이 0인 애니메이션 데이터
  const [animatedData, setAnimatedData] = useState([
    { label: '총 지출', value: 0 },
    { label: '목표 금액', value: 0 },
  ]);

  // ✅ 원래의 데이터 (최종적으로 표시될 값)
  const originalData = [
    { label: '총 지출', value: totalSpending },
    { label: '목표 금액', value: goalAmount || 0 },
  ];

  // 현재 날짜 가져오기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // ✅ 애니메이션 적용 (로딩 완료 후 실행)
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setAnimatedData(originalData);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [totalSpending, goalAmount, loading]);

  // ✅ API 호출하여 지출 데이터 가져오기
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        console.log(
          `📢 ${currentYear}년 ${currentMonth}월 지출 데이터를 불러옵니다.`
        );

        const expenseData = await getExpenseByMonth(currentYear, currentMonth);
        const expenseDataArray = expenseData.data;

        if (Array.isArray(expenseDataArray)) {
          setExpenseItems(expenseDataArray);
          setTotalSpending(
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

  // 카테고리별로 지출 데이터 그룹화 (reduce() 활용) -> 초깃값을 객체로 했음. 객체 하나가 딱 생김.

  //객체의 키는 '카테고리' 이며 value는 객체 (키 : 카테고리, 값 : 숫자값)
  //객체의 value는 현재 4개인데, 이 4래를 배열화 시키는 함수가 Object.Values임
  //이걸 새로운 배열
  const groupedExpenses = expenseItems.reduce((acc, cur) => {
    if (!acc[cur.category]) {
      acc[cur.category] = { category: cur.category, totalAmount: 0 };
    }
    acc[cur.category].totalAmount += cur.amount;
    return acc;
  }, {});

  // 분류화 된 객체들을 배열화 시켜서 아래에서 이 배열로 렌덕링.
  const groupedExpenseArray = Object.values(groupedExpenses);

  return (
    <div className={`graph-wrapper ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      {/* ✅ 로딩 화면 추가 */}
      {loading ? (
        <LoadingIndicator loading={loading} error={error}></LoadingIndicator>
      ) : (
        <>
          {/* 좌측 섹션: 그래프 */}
          <div className="graph-left">
            <div className="expense-graph-card">
              <h3>지출, 목표 금액 비교 그래프</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={animatedData} barGap={10}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 14 }} />
                  <YAxis tick={{ fontSize: 14 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    itemStyle={{ color: '#001f5c', fontWeight: 600 }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="value" fill="#001f5c" radius={[10, 10, 0, 0]}>
                    {animatedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        style={{
                          transition:
                            'height 1s ease-in-out, opacity 0.8s ease-in-out',
                          opacity: entry.value === 0 ? 0 : 1,
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ✅ 우측 섹션: 카테고리별 주요 소비 항목 */}
          <div className="graph-right">
            <h2 className="graph-title">카테고리별 소비 금액</h2>
            <div className="top-expense-card">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>카테고리</th>
                    <th>총 금액 (₩)</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedExpenseArray.length > 0 ? (
                    groupedExpenseArray.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.category}</td>
                        <td>{expense.totalAmount.toLocaleString()}원</td>
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

export default GraphPage;
