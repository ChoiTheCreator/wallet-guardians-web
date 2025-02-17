import apiClient from './apiClient';

//
// 지출을 수동으로 입력했을 때 (POST 요청)
//InputEntryModal.jsx의 핸들러 (지출 수동 입력 인풋 메서드)에 바디 data 주입을 떠넘기 따라서 args가 확 주는 효과
//핸들러에서 바디값을 만들어서 주기때문에 확 편해짐 -> 포스팅함요
export const saveExpense = async (expenseData) => {
  try {
    const response = await apiClient.post(`/expense`, expenseData);

    //디버깅 코드 ; post 잘 되었니
    console.log(`✅ [saveExpense] 지출 저장 성공! 응답:`, response.data);
  } catch (error) {
    console.error(
      `❌ [saveExpense] 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};

//추가한 지출 내역을 가져오는 기능 (day) -> api 파라미터의 매개변수 date
export const getExpenseByDate = async (date) => {
  try {
    //디버깅
    console.log(`🟢 [getExpenseByDate] ${date}의 지출 내역 요청`);
    const response = apiClient.get(`/expense/day?date=${date}`);

    console.log(`✅ [getExpenseByDate] 지출 조회 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ [getExpenseByDate] 지출 조회 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};

//추가한 지출 내역을 가져오는 기능 (month) -> api 파라미터의 매개변수 year & month
export const getExpenseByMonth = async (year, month) => {
  try {
    console.log(`🟢 [getExpenseByMonth] ${year}년 ${month}월 지출 조회 요청`);

    const response = await apiClient.get(
      `/expense/month?year=${year}&month=${month}`
    );
    console.log(`✅ [getExpenseByMonth] 응답 데이터:`, response.data);

    //객체담긴 배열 드림요 (amount 속성이 value임)
    return response.data;
  } catch (error) {
    //디버깅 함수 추가
    console.error(`❌ [getExpenseByMonth] 지출 조회 실패!`, error.response?.data || error.message);
    throw error;
  }
};

// 지출 조회 (GET 요청)
export const getExpense = async (date, accessToken, refreshToken) => {
  try {
    console.log(`🟢 [getExpense] 지출 조회 요청: 날짜: ${date}`);
    console.log(e
      `🔑 [getExpense] 액세스 토큰 확인:`,
      accessToken ? '✅ 있음' : '❌ 없음'
    );
    console.log(
      `🔑 [getExpense] 리프레시 토큰 확인:`,
      refreshToken ? '✅ 있음' : '❌ 없음'
    );

    if (!accessToken) {
      throw new Error('❌ 액세스 토큰이 없습니다. 로그인을 확인하세요.');
    }

    const response = await apiClient.get(`/api/expense/${date}`, {
      headers: {
        'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
        'REFRESH-AUTH-KEY': `BEARER ${refreshToken || ''}`,
      },
    });

    console.log(`✅ [getExpense] 지출 조회 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ [getExpense] 지출 조회 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// 지출 수정 (PUT 요청)
export const updateExpense = async (
  expenseId,
  expenseData,
  accessToken,
  refreshToken
) => {
  try {
    console.log(
      `🟢 [updateExpense] 지출 수정 요청: ID: ${expenseId}, 데이터:`,
      expenseData
    );
    console.log(
      `🔑 [updateExpense] 액세스 토큰 확인:`,
      accessToken ? '✅ 있음' : '❌ 없음'
    );
    console.log(
      `🔑 [updateExpense] 리프레시 토큰 확인:`,
      refreshToken ? '✅ 있음' : '❌ 없음'
    );

    if (!accessToken) {
      throw new Error('❌ 액세스 토큰이 없습니다. 로그인을 확인하세요.');
    }

    const response = await apiClient.put(
      `/api/expense/${expenseId}`,
      expenseData,
      {
        headers: {
          'Content-Type': 'application/json',
          'ACCESS-AUTH-KEY': `BEARER ${accessToken}`,
          'REFRESH-AUTH-KEY': `BEARER ${refreshToken || ''}`,
        },
      }
    );

    console.log(`✅ [updateExpense] 지출 수정 성공! 응답:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ [updateExpense] 지출 수정 실패!`,
      error.response?.data || error.message
    );
    throw error;
  }
};
