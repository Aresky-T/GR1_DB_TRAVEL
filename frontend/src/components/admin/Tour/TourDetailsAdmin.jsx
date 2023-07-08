import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../../constant/route';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import CustomDateTimePicker from '../../mui_component/datetimepicker';

const TourDetailsAdmin = ({ tour, tourGuides, handleDeleteTour }) => {

    const navigate = useNavigate();

    return (
        <div className='admin-main tour-detail-admin'>
            <h1>Chi tiết Tour</h1>
            <div className='back-to-prev-page_btn'>
                <span
                    onClick={() => {
                        navigate(ROUTE.TOUR_MANAGER)
                    }}
                >Quay lại</span>
            </div>
            <form className="admin-main-form td-admin-form"
                onSubmit={tour.handleSubmit}
            >
                <TextField
                    type='text'
                    name='title'
                    label='Tiêu đề'
                    required
                    fullWidth
                    margin='normal'
                    value={tour.values.title}
                    onChange={tour.handleChange}
                />
                <TextField
                    type='text'
                    name='destinationList'
                    label='Danh sách điểm đến'
                    required
                    fullWidth
                    margin='normal'
                    multiline
                    maxRows={5}
                    value={tour.values.destinationList}
                    onChange={tour.handleChange}
                />
                <div className="scheduleDes-tour-form">
                    <InputLabel
                        className='input-label'
                        required
                    >Mô tả lịch trình (bắt buộc)</InputLabel>
                    <ReactQuill
                        name="scheduleDescription"
                        theme="snow"
                        value={tour.values.scheduleDescription}
                        onChange={(e) => {
                            tour.setFieldValue('scheduleDescription', e)
                        }}
                    />
                </div>
                <Box
                    className='td-admin-form__time-address'
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridTemplateRows: 'auto',
                        columnGap: '20px'
                    }}
                >
                    <TextField
                        type='text'
                        name='startAddress'
                        label='Địa điểm khởi hành'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.startAddress}
                        onChange={tour.handleChange}
                    />
                    <FormControl
                        fullWidth
                        margin='normal'
                    >
                        <InputLabel id='td-admin-form__vehicle-id' required>Phương tiện</InputLabel>
                        <Select
                            labelId='td-admin-form__vehicle-id'
                            label='Phương tiện'
                            required
                            name='vehicle'
                            value={tour.values.vehicle}
                            onChange={tour.handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Máy bay"
                                defaultChecked={tour.values.vehicle === 'Máy bay'}
                            >Máy bay</MenuItem>
                            <MenuItem value="Xe du lịch"
                                defaultChecked={tour.values.vehicle === 'Xe du lịch'}
                            >Xe du lịch</MenuItem>
                            <MenuItem value="Máy bay, Xe du lịch"
                                defaultChecked={tour.values.vehicle === 'Máy bay, Xe du lịch'}
                            >Cả hai</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <TextField
                        type='text'
                        name='startTime'
                        label='Thời gian khởi hành'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.startTime}
                        onChange={tour.handleChange}
                    /> */}
                    <FormControl fullWidth margin='normal'>
                        <CustomDateTimePicker
                            label="Thời gian khởi hành (Giờ Việt Nam)"
                            value={tour.values.startTime}
                            setValue={(value) => {
                                tour.setFieldValue("startTime", value)
                            }}
                        />
                    </FormControl>
                    <TextField
                        type='text'
                        name='time'
                        label='Tổng thời gian'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.time}
                        onChange={tour.handleChange}
                    />
                </Box>
                <Box
                    className='td-admin-form__seats'
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        columnGap: '20px'
                    }}
                >
                    <TextField
                        type='number'
                        name='totalSeats'
                        label='Tổng số chỗ'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.totalSeats}
                        onChange={tour.handleChange}
                    />
                    <TextField
                        type='number'
                        name='availableSeats'
                        label='Số chỗ còn trống'
                        required
                        fullWidth
                        margin='normal'
                        InputProps={{
                            readOnly: true
                        }}
                        value={tour.values.availableSeats}
                    />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: '20px'
                }}
                    className="td-admin-form__prices"
                >
                    <TextField
                        type='number'
                        name='price1'
                        label='Giá cho người lớn'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.price1}
                        onChange={tour.handleChange}
                    />

                    <TextField
                        type='number'
                        name='price2'
                        label='Giá cho trẻ em'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.price2}
                        onChange={tour.handleChange}
                    />

                    <TextField
                        type='number'
                        name='price3'
                        label='Giá cho em bé'
                        required
                        fullWidth
                        margin='normal'
                        value={tour.values.price3}
                        onChange={tour.handleChange}
                    />
                </Box>
                <TextField
                    type='text'
                    name='image1'
                    label='Link ảnh 1'
                    required
                    fullWidth
                    margin='normal'
                    value={tour.values.image1}
                    onChange={tour.handleChange}
                />
                <TextField
                    type='text'
                    name='image2'
                    label='Link ảnh 2'
                    required
                    fullWidth
                    margin='normal'
                    value={tour.values.image2}
                    onChange={tour.handleChange}
                />
                <TextField
                    type='text'
                    name='image3'
                    label='Link ảnh 3'
                    required
                    fullWidth
                    margin='normal'
                    value={tour.values.image3}
                    onChange={tour.handleChange}
                />
                <TextField
                    type='text'
                    name='image4'
                    label='Link ảnh 4'
                    required
                    fullWidth
                    margin='normal'
                    value={tour.values.image4}
                    onChange={tour.handleChange}
                />
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    columnGap: '20px'
                }}>
                    <TextField
                        type='text'
                        name='tourCode'
                        label='Mã Tour'
                        required
                        fullWidth
                        margin='normal'
                        InputProps={{
                            readOnly: true
                        }}
                        value={tour.values.tourCode}
                    />
                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="td-admin-form__tour-guide-id">Người dẫn đoàn</InputLabel>
                        <Select
                            name='tourGuideId'
                            labelId='td-admin-form__tour-guide-id'
                            label="Người dẫn đoàn"
                            value={tour.values.tourGuideId || 0}
                            onChange={tour.handleChange}
                        >
                            <MenuItem value={0}>Chưa xác định</MenuItem>
                            {tour.values.tourGuide &&
                                <MenuItem value={tour.values.tourGuide.id}>
                                    <span>{tour.values.tourGuide.fullName} - (ID: {tour.values.tourGuide.id})</span>
                                </MenuItem>
                            }
                            {tourGuides?.map(item => (
                                <MenuItem key={item.id}
                                    value={item.id}
                                    defaultChecked={item.id === tour.values.tourGuideId}
                                >
                                    <span>{item.fullName} - (ID: {item.id})</span>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="td-admin-form__tour-guide-id">Trạng thái Tour</InputLabel>
                        <Select
                            name='status'
                            labelId='td-admin-form__tour-guide-id'
                            label="Người dẫn đoàn"
                            value={tour.values.status || ''}
                            onChange={tour.handleChange}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="NOT_STARTED">Chưa diễn ra</MenuItem>
                            <MenuItem value="ON_GOING">Đang diễn ra</MenuItem>
                            <MenuItem value="FINISHED">Đã hoàn thành</MenuItem>
                            <MenuItem value="CANCELED">Đã bị hủy</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button type='button'
                    className='admin-form__btn admin-form__btn--delete'
                    onClick={handleDeleteTour}
                >
                    Xóa Tour này
                </Button>
                <Button
                    type='submit'
                    className='admin-form__btn admin-form__btn--submit'
                >
                    Xác nhận chỉnh sửa
                </Button>
            </form>
        </div>
    )
}

export default TourDetailsAdmin