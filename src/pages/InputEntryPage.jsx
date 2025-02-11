import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/InputEntryPage.scss';
import moment from 'moment';
import backbutton from '../IMG/backbutton.png';
import InputEntryModal from './InputEntryModal';
import ReceiptModal from './ReceiptAddModal';

const InputEntryPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const selectedDate = new Date(date);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openReceiptModalOpen = () => setReceiptModalOpen(true);
  const closeReceiptModal = () => setReceiptModalOpen(false);

  // 날짜 클릭 시 해당 날짜 페이지로 이동
  const handleDateClick = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    navigate(`/input-entry/${formattedDate}`);
  };

  // 영수증 페이지로 이동
  const handleReceiptPage = () => {
    navigate(`/receipt`);
  };

  // 메인 페이지로 돌아가기
  const handleBackClick = () => {
    navigate('/main');
  };

  return (
    <div className="input-entry-page">
      {/* 제목 가운데 정렬 */}
      <h1>{selectedDate.toLocaleDateString('ko-KR')} 가계부 작성</h1>

      <p>이제 지출을 추가해보세요!</p>

      {/* 뒤로가기 버튼 (달력 오른쪽 상단에 배치) */}
      <button
        className="back-button"
        onClick={handleBackClick}
        title="뒤로가기"
      >
        <img src={backbutton} alt="뒤로가기" />
      </button>
      <div className="content-wrapper">
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDateClick}
            value={selectedDate}
            locale="ko-KR"
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format('D')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
          />

          <div className="form-button-wrapper">
            <button className="add-expense-button" onClick={openAddModal}>
              👉 직접 추가하기
            </button>
            <button className="receipt-button" onClick={openReceiptModalOpen}>
              🧾 영수증으로 추가하기
            </button>
          </div>
        </div>
        <div>
          <InputEntryModal isOpen={isAddModalOpen} onClose={closeAddModal} />
          <ReceiptModal
            isOpen={isReceiptModalOpen}
            onClose={closeReceiptModal}
          />
        </div>
      </div>
    </div>
  );
};

export default InputEntryPage;
