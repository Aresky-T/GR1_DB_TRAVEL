import React from "react";
import CustomPaginate from "../../pagination/CustomPaginate";
import { useNavigate } from "react-router-dom";

const BookingManager = ({ data, paginate, handleChangeCurrentPage }) => {
  const navigate = useNavigate();
  const renderStatus = (status) => {
    switch (status) {
      case "NOT_PAY":
        return "Chưa thanh toán";
      case "PAY_UP":
        return "Đã thanh toán";
      case "REJECTED":
        return "Bị từ chối";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="admin-main booking-manager-container">
      <h1>Quản lý Đặt Tour</h1>
      <section className="admin-main__body">
        <table className="admin-main__body__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th className="booking-manager__head--total-persons">
                Tổng hành khách
              </th>
              <th>Tổng giá (vnd)</th>
              <th>Thời gian đặt</th>
              <th>Tour đã đặt</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.content?.map((item) => (
              <tr className="admin-table-row">
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.totalPersons}</td>
                <td>{Number(item.totalPrice).toLocaleString("vi-VN")}</td>
                <td>{new Date(item.bookTime).toLocaleString()}</td>
                <td>{item.tourId}</td>
                <td>{renderStatus(item.status)}</td>
                <td className="admin-table-data__action">
                  <button
                    onClick={() => {
                      navigate(`/admin/booking/details/${item.id}`);
                    }}
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomPaginate
          currentPage={paginate?.pageNumber}
          totalPages={data?.totalPages}
          setCurrentPage={handleChangeCurrentPage}
        />
      </section>
    </div>
  );
};

export default BookingManager;
