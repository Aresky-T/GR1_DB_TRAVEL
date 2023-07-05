import {useNavigate} from 'react-router-dom';
import {ROUTE} from '../../../constant/route';
import CustomPaginate from '../../pagination/CustomPaginate';

const TouristAttractionManager = ({data, fields, handleChangeCurrentPage}) => {

    const navigate = useNavigate();

    return (
        <div className='admin-main tourist-attraction-manager'>
            <section className='admin-main__header'>
                <button
                    className='admin-main__header__btn'
                    onClick={() => {
                        navigate(ROUTE.TOURIST_ATTRACTION_CREATE)
                    }}
                >Thêm mới địa điểm du lịch
                </button>
            </section>
            <section className="admin-main__body">
                <table className='admin-main__body__table tourist-att-table'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Created time</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.content.map((item, index) => (
                        <tr key={index}
                            className='admin-table-row'
                        >
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.title}</td>
                            <td>{new Date(item.createdTime).toLocaleString()}</td>
                            <td className='admin-table-data__action'>
                                <button
                                    onClick={() => {
                                        navigate(`/admin/tourist-attraction/details/${item.id}`)
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
                    totalPages={data?.totalPages}
                    setCurrentPage={handleChangeCurrentPage}
                />
            </section>
        </div>
    )
}

export default TouristAttractionManager