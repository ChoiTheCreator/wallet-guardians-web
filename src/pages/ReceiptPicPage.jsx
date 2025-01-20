import React, { useState } from 'react';
import '../style/ReceiptPicPage.scss';

const ReceiptPicPage = () => {
  const [receiptImages, setReceiptImages] = useState([
    '/images/receipt1.jpg',
    '/images/receipt2.jpg',
    '/images/receipt3.jpg',
  ]);

  return (
    <div className="receipt-pic-page">
      <h1>영수증 사진 모음</h1>
      <div className="receipt-gallery">
        {receiptImages.length > 0 ? (
          receiptImages.map((image, index) => (
            <div key={index} className="receipt-item">
              <img src={image} alt={`영수증-${index}`} />
            </div>
          ))
        ) : (
          <p>업로드된 영수증이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ReceiptPicPage;
