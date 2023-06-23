import React from 'react'
import TouristFields from './TouristFields';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';

const CustomerInfo = ({ bookingFormik, handleChangeTouristNumber }) => {

    const renderAdultFieldsList = () => {
        const list1 = bookingFormik.values.adults;
        return list1.map((tourist, i) => (
            <TouristFields label="Người lớn" key={i}
                bookingFormik={bookingFormik}
                tourist={tourist}
                list={list1}
                listName="adults"
            />));
    }

    const renderChildrenFieldsList = () => {
        const list2 = bookingFormik.values.children;
        return list2.map((tourist, i) => (
            <TouristFields label="Trẻ em" key={i}
                bookingFormik={bookingFormik}
                tourist={tourist}
                list={list2}
                listName="children"
            />));
    }

    const renderBabyFieldsList = () => {
        const list3 = bookingFormik.values.babies;
        return list3.map((tourist, i) => (
            <TouristFields label="Em bé" key={i}
                bookingFormik={bookingFormik}
                tourist={tourist}
                list={list3}
                listName="babies"
            />));
    }

    return (
        <>
            <div className="ci__sub-title">
                <span className="subtitle">Thông tin khách hàng</span>
            </div>
            <div className="ci__representative">
                <h3 className="cir__title">
                    Người đại diện
                </h3>
                <div className="cir-info--fields">
                    <div className="cir-info__item">
                        <label>Họ tên: </label>
                        <input type="text" name="fullName"
                            value={bookingFormik.values.fullName}
                            onChange={bookingFormik.handleChange}
                        />
                    </div>
                    <div className="cir-info__item">
                        <label>Email: </label>
                        <input type="text" name="email"
                            value={bookingFormik.values.email}
                            onChange={bookingFormik.handleChange}
                        />
                    </div>
                    <div className="cir-info__item">
                        <label>Số điện thoại: </label>
                        <input type="text" name="phone"
                            value={bookingFormik.values.phone}
                            onChange={bookingFormik.handleChange}
                        />
                    </div>
                    <div className="cir-info__item">
                        <label>Địa chỉ: </label>
                        <input type="text" name="address"
                            value={bookingFormik.values.address}
                            onChange={bookingFormik.handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="ci__tourist-list">
                <h3 className='cit__title'>Hành khách</h3>
                <div className="ct__tourist-type">
                    <div className='cit-type__item'>
                        <h5 className='cit-type__item__title'>Người lớn</h5>
                        <span className='cit-type__item__note'>(Từ 12 tuổi trở lên)</span>
                        <div>
                            <span
                                onClick={() => {
                                    handleChangeTouristNumber("adultNumber", "decrease")
                                }}
                            ><AiFillMinusCircle /></span>
                            <p>{bookingFormik.values.adultNumber}</p>
                            <span
                                onClick={() => {
                                    handleChangeTouristNumber("adultNumber", "increase")
                                }}
                            ><IoAddCircle /></span>
                        </div>
                    </div>
                    <div className='cit-type__item'>
                        <h5 className='cit-type__item__title'>Trẻ em</h5>
                        <span className='cit-type__item__note'>(Từ 2 - 11 tuổi)</span>
                        <div>
                            <span
                                onClick={() => {
                                    handleChangeTouristNumber("childrenNumber", "decrease")
                                }}
                            ><AiFillMinusCircle /></span>
                            <p>{bookingFormik.values.childrenNumber}</p>
                            <span
                                onClick={() => {
                                    handleChangeTouristNumber("childrenNumber", "increase")
                                }}
                            ><IoAddCircle /></span>
                        </div>
                    </div>
                    <div className='cit-type__item'>
                        <h5 className='cit-type__item__title'>Em bé</h5>
                        <span className='cit-type__item__note'>(Dưới 2 tuổi)</span>
                        <div>
                            <span
                                onClick={() => {
                                    handleChangeTouristNumber("babyNumber", "decrease")
                                }}
                            ><AiFillMinusCircle /></span>
                            <p>{bookingFormik.values.babyNumber}</p>
                            <span
                                onClick={() => {
                                    handleChangeTouristNumber("babyNumber", "increase")
                                }}
                            ><IoAddCircle /></span>
                        </div>
                    </div>
                </div>
                <div className="ci__tl__main">
                    {renderAdultFieldsList()}
                    {renderChildrenFieldsList()}
                    {renderBabyFieldsList()}
                </div>
            </div>
        </>
    )
}

export default CustomerInfo