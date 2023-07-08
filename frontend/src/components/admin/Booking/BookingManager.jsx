import React from 'react'
import CustomPaginate from '../../pagination/CustomPaginate'
import { useNavigate } from 'react-router-dom'

const BookingManager = ({ data, paginate, handleChangeCurrentPage }) => {
  const navigate = useNavigate();

  return (
    <div className='admin-main booking-manager-container'>
      <h1>Quản lý Đặt Tour</h1>
      <section className="admin-main__body">
        <table className="admin-main__body__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th className='booking-manager__head--total-persons'>Tổng hành khách</th>
              <th>Tổng giá</th>
              <th>Thời gian đặt</th>
              <th>Tour đã đặt</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.content?.map(item => (
              <tr className='admin-table-row'>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.totalPersons}</td>
                <td>{item.totalPrice}</td>
                <td>{new Date(item.bookTime).toLocaleString()}</td>
                <td>{item.tourId}</td>
                <td>{item.status}</td>
                <td className='admin-table-data__action'>
                  <button
                    onClick={() => {
                      navigate(`/admin/booking/details/${item.id}`)
                    }}
                  >Xem</button>
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
  )
}

export default BookingManager