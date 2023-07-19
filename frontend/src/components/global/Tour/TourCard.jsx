import React from 'react'
import { FaOpencart, FaRegClock } from 'react-icons/fa'
import { BsTicket, BsHourglassSplit } from 'react-icons/bs'
import { BiMap } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { IoBus } from 'react-icons/io5'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const TourCard = ({ tour }) => {
    const navigate = useNavigate();

    const onClickBooking = () => {
        navigate(`/booking/${tour.tourCode}`);
    }

    return (
        <div className="tour-card">
            <div className="tour-card__image">
                <img src={tour.image1} alt="" />
                <span className="price">
                    {tour.price1.toLocaleString("en-US")}₫
                </span>
            </div>
            <div className="tour-card__main">
                <div className="tour-card__info">
                    <div className="tour-card__title"
                        onClick={() => {
                            navigate(`/tour/${tour.id}`)
                        }}
                    >
                        <p>{tour.title}</p>
                    </div>
                    <div className="tour-card-item">
                        <p className="text"
                            style={{
                                fontWeight: "bold",
                                color: "var(--primary-color)"
                            }}
                        >
                            <span className="tour-card__subtitle">
                                <BsHourglassSplit />
                            </span>
                            <span className="content">
                                {tour.time}
                            </span>
                        </p>
                    </div>
                    <div className="tour-card-item">
                        <p className="text">
                            <span className="tour-card__subtitle">
                                <FaRegClock /> Thời gian khởi hành:
                            </span>
                            <span className="content">
                                {new Date(tour.startTime).toLocaleString("vi-VN", { timeStyle: "short", dateStyle: "short" })}
                            </span>
                        </p>
                    </div>
                    <div className="tour-card-item">
                        <p className="text">
                            <span className="tour-card__subtitle">
                                <BsTicket /> Mã tour:
                            </span>
                            <span className="content">{tour.tourCode}</span>
                        </p>
                    </div>
                    <div className="tour-card-item">
                        <p className="text">
                            <span className="tour-card__subtitle">
                                <BiMap /> Nơi khởi hành:
                            </span>
                            <span className="content">{tour.startAddress}</span>
                        </p>
                    </div>
                    <div className="tour-card-item">
                        <p className="text">
                            <span className="tour-card__subtitle">
                                <IoBus /> Phuơng tiện di chuyển:
                            </span>
                            <span className="content">{tour.vehicle}</span>
                        </p>
                    </div>
                    <div className="tour-card-item">
                        <p className="text">
                            <span className="tour-card__subtitle">
                                <MdOutlinePeopleAlt /> Số chỗ còn trống:
                            </span>
                            <span className="content available-seats">{tour.availableSeats}</span>
                        </p>
                    </div>
                </div>
                <div className="tour-card__action">
                    <div className="action_item booking">
                        <button
                            onClick={onClickBooking}
                        > <FaOpencart /> Đặt ngay</button>
                    </div>
                    <div className="action_item detail"
                        onClick={() => {
                            navigate(`/tour/${tour.id}`)
                        }}
                    >
                        <button>Xem chi tiết</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourCard