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
    //서버에서 가져온 totalSpending 상태를 데이터에 추가
    { label: '총 지출', value: totalSpending },
    { label: '목표 금액', value: goalAmount || 0 },
  ];

  // 현재 날짜 가져오기 -> 자바스크립트 객체 감사하다
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // 애니메이션 적용하는 useEffect
  useEffect(() => {
    //로딩이 끝나고 나서 애니메이션으로 그래프를 움직여줘야함
    if (!loading) {
      const timeout = setTimeout(() => {
        setAnimatedData(originalData); // 0에서 실제 값으로 변경
      }, 300); // 0.3초 후 실행 (부드러운 시작 효과)
      return () => clearTimeout(timeout); // 정리 함수로 불필요한 실행 방지
    }
  }, [totalSpending, goalAmount, loading]);

  //초기 렌더링시 데이터 fetching하여 가져올 지출데이터
  //여기서의 함수는 useEffect() 내부에서 함수를 선언하고 실행함 - 클로저 문제 해결인데 이게 뭔소리인지 몰겠다

  useEffect(() => {
    //여기서 axios 통신 3권을 함
    //일단 데이터를 받아올건데 말이지
    const fetchExpenses = async () => {
      try {
        setLoading(true); //데이터 요청시 로딩 시작
        console.log(
          `📢 ${currentYear}년 ${currentMonth}월 지출 데이터를 불러옵니다.`
        );

        //우리가 정의한 expenseByMonth api함수는 년도와 월을 받음
        //따라서 현 시점 기준의 날짜 객체를 갖고온다.
        const expenseData = await getExpenseByMonth(currentYear, currentMonth);

        const expenseDataArray = expenseData.data;
        //받아온 데이터; 객체배열 아닐 경우 검증
        if (Array.isArray(expenseDataArray)) {
          setExpenseItems(expenseDataArray);
          setTotalSpending(
            //reduce() -> 배열의 값들을 하나로 합치는 합성코드임요
            expenseDataArray.reduce((acc, cur) => acc + cur.amount, 0)
          );
        }
        //아마도 그럴일 없긴하데 만약 서버에서 배열아니고 이상한거주면 백엔드에 따져야함
        else {
          console.warn(
            '🚨 서버에서 받은 데이터가 배열이 아닙니다 백엔드에 따져야함:',
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
    //왜 useEffect에 함수를 정의하고 그 아래다가 바로 선언함? 걍 밖에 선언하면 되는거아님?
    fetchExpenses();
  }, []);

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
              <h3>지출, 수입, 목표 금액 비교 그래프</h3>
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
                          opacity: entry.value === 0 ? 0 : 1, // 애니메이션 자연스럽게
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 우측 섹션: 주요 소비 항목 */}
          <div className="graph-right">
            <h2 className="graph-title">주요 소비 항목</h2>
            <div className="top-expense-card">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>카테고리</th>
                    <th>항목</th>
                    <th>금액 (₩)</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseItems.length > 0 ? (
                    expenseItems.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.category}</td>
                        <td>{expense.item}</td>
                        <td>{expense.amount.toLocaleString()}원</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">데이터가 없습니다.</td>
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
