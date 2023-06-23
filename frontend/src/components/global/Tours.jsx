import React from 'react'
import { MdLocationOn, MdDirectionsBus } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import toursHeaderImage from '../../assets/image/tours-header-image.jpeg'
import LoadingIndicator from "./LoadingIndicator";
import TourCard from "./TourCard";
import CustomPaginate from "../pagination/CustomPaginate";

const Tours = ({ fields, handleChangeFilter, handleSubmitFilter, tours, totalPages, handleChangeCurrentPage }) => {

    return (
        <div className='main-session tours-container'>
            <section className="main-session-header tours-header">
                <div className='header-item tours-header__image'>
                    <img src={toursHeaderImage} alt='tours-header' />
                    <h1>Khám phá Tour</h1>
                </div>
                <div className='header-filter tours-filter'>
                    <div className='filter-bar'>
                        <div className='filter-item'>
                            <div className="filter-icon">
                                <MdLocationOn />
                            </div>
                            <div className='filter-field'>
                                <label htmlFor="destination">Điểm đến</label>
                                <input
                                    type="text"
                                    name="destination"
                                    id='destination'
                                    placeholder="Bạn muốn đi đâu?"
                                    defaultValue={fields?.destination}
                                    onChange={handleChangeFilter}
                                />
                            </div>
                        </div>
                        <div className='filter-item'>
                            <div className="filter-icon">
                                <MdLocationOn />
                            </div>
                            <div className="filter-field">
                                <label htmlFor="start-address">Điểm bắt đầu</label>
                                <input
                                    type="text"
                                    name="startAddress"
                                    id="start-address"
                                    placeholder="Nơi bạn khởi hành?"
                                    defaultValue={fields?.startAddress}
                                    onChange={handleChangeFilter}
                                />
                            </div>
                        </div>
                        <div className='filter-item'>
                            <div className='filter-icon'>
                                <MdDirectionsBus />
                            </div>
                            <div className='filter-field'>
                                <label>Phương tiện</label>
                                <select name='vehicle' value={fields?.vehicle}
                                    onChange={handleChangeFilter}
                                >
                                    <option defaultChecked={true} value=''>Không có</option>
                                    <option value="Máy bay">Máy bay</option>
                                    <option value="Xe du lịch">Xe du lịch</option>
                                    <option value="Máy bay, Xe du lịch">Cả hai</option>
                                </select>
                            </div>
                        </div>
                        <div className='filter-item'>
                            <div className='filter-submit'
                                onClick={handleSubmitFilter}
                            >
                                <FiSearch />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='tours-main'>
                {tours && tours.length > 0 ?
                    <div className='tours-list'>
                        {tours.map(tour => (
                            <TourCard tour={tour} key={tour.id} />
                        ))}
                    </div>
                    :
                    <LoadingIndicator />
                }
                <CustomPaginate
                    currentPage={fields?.pageNumber}
                    firstLabel="Đầu"
                    lastLabel="Cuối"
                    setCurrentPage={handleChangeCurrentPage}
                    totalPages={totalPages}
                />
            </section>
        </div>
    )
}

export default Tours