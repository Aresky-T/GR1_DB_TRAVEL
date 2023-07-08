import React, { useEffect, useRef, useState } from 'react'
import { MdLocationOn, MdDirectionsBus } from 'react-icons/md'
import { FiSearch } from 'react-icons/fi'
import { GiMoneyStack } from 'react-icons/gi'
import { IoIosArrowDown } from 'react-icons/io'
import toursHeaderImage from '../../../assets/image/tours-header-image.jpeg'
import TourCard from "./TourCard";
import CustomPaginate from "../../pagination/CustomPaginate";
import PriceRangeSlider from '../Slider/PriceRangeSlider'
import RollerLoading from '../Loading/RollerLoading'

const Tours = ({
    fields,
    handleChangeFilter,
    handleChangePrices,
    handleSubmitFilter,
    prices,
    tours,
    totalPages,
    handleChangeCurrentPage,
    isLoading,
}) => {

    const [isShow, setIsShow] = useState(false);
    const pricesRef = useRef();

    const handleChangeIsShow = () => {
        setIsShow(!isShow)
    }

    useEffect(() => {
        const handleClose = (e) => {
            if (pricesRef.current?.slider && !pricesRef.current.slider.current.contains(e.target)) {
                setIsShow(false);
            }
        }
        document.addEventListener("mousedown", handleClose);
        return () => {
            document.removeEventListener("mousedown", handleClose)
        }
    })

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
                        <div className='filter-item filter-by-vehicle'>
                            <div className='filter-icon'>
                                <MdDirectionsBus />
                            </div>
                            <div className='filter-field'>
                                <label>Phương tiện</label>
                                <select name='vehicle' value={fields?.vehicle}
                                    onChange={handleChangeFilter}
                                >
                                    <option defaultChecked={true} value=''>Bấm chọn</option>
                                    <option value="Máy bay">Máy bay</option>
                                    <option value="Xe du lịch">Xe du lịch</option>
                                    <option value="Máy bay, Xe du lịch">Cả hai</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter-item filter-by-price">
                            <div className="filter-icon">
                                <GiMoneyStack />
                            </div>
                            <div className='filter-field'>
                                <label>Giá</label>
                                <p onClick={handleChangeIsShow}>{prices.minPrice.toLocaleString('vi-VN')} - {prices.maxPrice.toLocaleString('vi-VN')}đ <IoIosArrowDown />
                                </p>
                                {isShow && <PriceRangeSlider
                                    prices={prices}
                                    handleChangePrices={handleChangePrices}
                                    ref={pricesRef}
                                />}
                            </div>
                        </div>
                        <div className='filter-item filter-submit'>
                            <div className='submit-icon'
                                onClick={handleSubmitFilter}
                            >
                                <FiSearch />
                                <span>Tìm kiếm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='tours-main'>
                {isLoading ?
                    <div className='tours-main__loading'>
                        <RollerLoading />
                    </div>
                    :
                    <>
                        {tours && tours.length > 0 ?
                            <div className='tours-list'>
                                {tours.map(tour => (
                                    <TourCard tour={tour} key={tour.id} />
                                ))}
                            </div>
                            :
                            <div className='tours-list--empty'>Không có kết quả!</div>
                        }
                        <CustomPaginate
                            currentPage={fields?.pageNumber}
                            firstLabel="Đầu"
                            lastLabel="Cuối"
                            setCurrentPage={handleChangeCurrentPage}
                            totalPages={totalPages}
                        />
                    </>
                }
            </section>
        </div>
    )
}

export default Tours