import './searchItem.css';

const SearchItem = () => {
  return (
    <div className='searchItem'>
      <img
        src='https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1'
        alt=''
        className='siImg'
      />
      <div className='siDesc'>
        <h1 className='siTitle'>Căn hộ phố Khâm Thiên</h1>
        <span className='siDistance'>Cách trung tâm 500m</span>
        <span className='siTaxiOp'>Miễn phí taxi sân bay</span>
        <span className='siSubtitle'>Căn hộ dạng Studio có điều hoà</span>
        <span className='siFeatures'>
          Toàn bộ studio • 1 phòng tắm • 21m² 1 giường đôi
        </span>
        <span className='siCancelOp'>Huỷ phòng miễn phí </span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!Bạn có thể hủy
          sau, vì vậy hãy chọn mức giá tuyệt vời này ngay hôm nay!
        </span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <span>Tuyệt vời</span>
          <button>8.9</button>
        </div>
        <div className='siDetailTexts'>
          <span className='siPrice'>$112</span>
          <span className='siTaxOp'>Đã bao gồm thuế</span>
          <button className='siCheckButton'>Xem phòng sẵn có</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
