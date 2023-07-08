import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constant/route';
import CustomPaginate from '../../pagination/CustomPaginate';


const TourManager = ({ data, fields, handleChangeCurrentPage }) => {

    const navigate = useNavigate();

    return (
        <div className='admin-main tour-manager'>
            <section className="admin-main__header ">
                <button className="admin-main__header__btn" onClick={() => {
                    navigate(ROUTE.TOUR_CREATE)
                }}>Thêm mới Tour
                </button>
            </section>
            <section className="admin-main__body">
                <table className='admin-main__body__table tour-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Tổng thời gian</th>
                            <th>Địa điểm khởi hành</th>
                            <th>Số chỗ trống</th>
                            <th>Giá người lớn (VND)</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.content?.map((item, index) => (
                            <tr key={index}
                                className='admin-table-row'
                            >
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.time}</td>
                                <td>{item.startAddress}</td>
                                <td>{item.availableSeats}</td>
                                <td>{Number(item.price1).toLocaleString("vi-VN")}</td>
                                <td>{item.status}</td>
                                <td className='admin-table-data__action'>
                                    <button
                                        onClick={() => {
                                            navigate(`/admin/tour/details/${item.id}`)
                                        }}
                                    >Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CustomPaginate
                    currentPage={fields.pageNumber}
                    firstLabel="<"
                    lastLabel=">"
                    setCurrentPage={handleChangeCurrentPage}
                    totalPages={data.totalPages}
                />
            </section>
        </div>
    )
}

export default TourManager