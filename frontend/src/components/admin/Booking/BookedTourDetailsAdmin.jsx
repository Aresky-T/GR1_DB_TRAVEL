import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../../constant/route';

const BookedTourDetailsAdmin = ({ bookedTour, handleSubmit }) => {
    const navigate = useNavigate();
    return (
        <div className='admin-main booked-tour-details-container'>
            <h1>Chi tiết tour đã đặt</h1>
            <div className='back-to-prev-page_btn'>
                <span
                    onClick={() => {
                        navigate(ROUTE.BOOKING_MANAGER)
                    }}
                >Quay lại</span>
            </div>
            <form className='admin-main-form'>
                <h3>Thông tin người đặt tour</h3>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '20px'
                }}>
                    <TextField
                        type='text'
                        fullWidth
                        margin='normal'
                        name='fullName'
                        label='Họ tên khách hàng'
                        value={bookedTour.values.fullName}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        type='text'
                        fullWidth
                        margin='normal'
                        name='email'
                        label='Email'
                        value={bookedTour.values.email}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        type='text'
                        fullWidth
                        margin='normal'
                        name='phone'
                        label='Số điện thoại'
                        value={bookedTour.values.email}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Box>
                <TextField
                    type='text'
                    fullWidth
                    margin='normal'
                    name='address'
                    label='Địa chỉ'
                    value={bookedTour.values.address}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '20px'
                }}>
                    <TextField
                        type='number'
                        fullWidth
                        margin='normal'
                        name='adultNumber'
                        label='Số người lớn'
                        value={bookedTour.values.adultNumber}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        type='number'
                        fullWidth
                        margin='normal'
                        name='childrenNumber'
                        label='Số trẻ em'
                        value={bookedTour.values.childrenNumber}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        type='number'
                        fullWidth
                        margin='normal'
                        name='babyNumber'
                        label='Số em bé'
                        value={bookedTour.values.adultNumber}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Box>
                <TextField
                    type='text'
                    fullWidth
                    margin='normal'
                    name='fullName'
                    label='Nhắn nhủ tới từ khách hàng'
                    multiline
                    value={bookedTour.values.note}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <h3>Danh sách hành khách</h3>
                {bookedTour.values.touristList.map(tourist => (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        columnGap: '20px'
                    }}
                        key={tourist.fullName}
                    >
                        <TextField
                            type='text'
                            fullWidth
                            margin='normal'
                            name='fullName'
                            label='Họ tên'
                            value={tourist.fullName}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                        <TextField
                            type='text'
                            fullWidth
                            margin='normal'
                            name='fullName'
                            label='Giới tính'
                            value={tourist.gender}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                        <TextField
                            type='text'
                            fullWidth
                            margin='normal'
                            name='birthDate'
                            label='Ngày sinh'
                            value={new Date(tourist.birthDate).toLocaleDateString("vi-VN", { dateStyle: "medium" })}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    </Box>
                ))}
                <h3>Thông tin Tour và tổng chi phí</h3>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '20px'
                }}>
                    <TextField
                        type='text'
                        fullWidth
                        margin='normal'
                        name='tourId'
                        label='ID của Tour khách hàng đã đặt'
                        value={bookedTour.values.tourId}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="booked-tour-admin-form__status-id">Trạng thái đặt tour</InputLabel>
                        <Select
                            name='status'
                            labelId='booked-tour-admin-form__status-id'
                            label="Trạng thái đặt tour"
                            value={bookedTour.values.status || ''}
                            onChange={bookedTour.handleChange}
                        >
                            <MenuItem value="NOT_PAY">Chưa thanh toán</MenuItem>
                            <MenuItem value="PAY_UP">Đã thanh toán</MenuItem>
                            <MenuItem value="REJECTED">Từ chối</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type='text'
                        fullWidth
                        margin='normal'
                        name='totalPrice'
                        label='Tổng tiền khách hàng phải thanh toán (đơn giá: VND)'
                        value={bookedTour.values.totalPrice.toLocaleString('vi-VN')}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Box>
                <Button
                    className='admin-form__btn admin-form__btn--submit'
                    type='button'
                    onClick={handleSubmit}
                >
                    Cập nhật
                </Button>
            </form>
        </div>
    )
}

export default BookedTourDetailsAdmin