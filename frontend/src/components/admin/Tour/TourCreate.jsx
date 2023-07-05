import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../../constant/route'
import { AiFillDelete } from 'react-icons/ai'
import CustomDateTimePicker from '../../mui_component/datetimepicker';

const TourCreate = ({ formik, selectedFiles, setEmptySelectedFiles, handleChangeFiles, handleResetFormik }) => {
    const navigate = useNavigate();
    const inputFileRef = useRef();

    const handleFocusInputFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    }

    return (
        <div
            className='admin-main tour-create-container'
        >
            <h1 className='admin-main__title'>Thêm mới Tour</h1>
            <div className='back-to-prev-page_btn'>
                <span
                    onClick={() => {
                        navigate(ROUTE.TOUR_MANAGER)
                    }}
                >Quay lại</span>
            </div>
            <form
                className='admin-main-form'
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    name="title"
                    label="Tiêu đề"
                    required
                    fullWidth
                    margin="normal"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />

                <div className="time-tour-form">
                    {/* <TextField
                        name="startTime"
                        label="Thời gian khởi hành"
                        type="text"
                        required
                        fullWidth
                        margin="normal"
                        placeholder='Ví dụ: 14/06/2023 - 8:00'
                        value={formik.values.startTime}
                        onChange={formik.handleChange}
                    /> */}

                    <FormControl fullWidth margin='normal'>
                        <CustomDateTimePicker
                            label="Thời gian khởi hành (Giờ Việt Nam)"
                            value={formik.values.startTime}
                            setValue={(value) => {
                                formik.setFieldValue("startTime", value)
                            }}
                        />
                    </FormControl>

                    <TextField
                        name="time"
                        label="Tổng thời gian"
                        type="text"
                        required
                        fullWidth
                        margin="normal"
                        placeholder='Ví dụ: 2 ngày 1 đêm'
                        value={formik.values.time}
                        onChange={formik.handleChange}
                    />
                </div>

                <TextField
                    name="startAddress"
                    label="Địa điểm khởi hành"
                    type="text"
                    required
                    fullWidth
                    margin="normal"
                    value={formik.values.startAddress}
                    onChange={formik.handleChange}
                />

                <TextField
                    name="destinationList"
                    label="Danh sách điểm đến"
                    type="text"
                    required
                    fullWidth
                    multiline
                    maxRows={10}
                    margin="normal"
                    value={formik.values.destinationList}
                    onChange={formik.handleChange}
                />

                <div className="scheduleDes-tour-form">
                    <InputLabel
                        className='input-label'
                        required
                    >Mô tả lịch trình (bắt buộc)</InputLabel>
                    <ReactQuill
                        name="scheduleDescription"
                        theme="snow"
                        value={formik.values.scheduleDescription}
                        onChange={(e) => {
                            formik.setFieldValue('scheduleDescription', e)
                        }}
                    />
                </div>

                <div className="seats-n-vehicle">
                    <TextField
                        name="totalSeats"
                        label="Tổng số chỗ"
                        type="number"
                        required
                        fullWidth
                        margin="normal"
                        value={formik.values.totalSeats}
                        onChange={formik.handleChange}
                    />
                    <FormControl
                        margin='normal'
                        className='vehicle-tour-form'
                    >
                        <InputLabel id="vehicle-select-small-label">Phương tiện</InputLabel>
                        <Select
                            labelId="vehicle-select-small-label"
                            id="demo-select-small"
                            name='vehicle'
                            label="Phương tiện"
                            required
                            value={formik.values.vehicle}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Máy bay">Máy bay</MenuItem>
                            <MenuItem value="Xe du lịch">Xe du lịch</MenuItem>
                            <MenuItem value="Máy bay, Xe du lịch">Cả hai</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className='prices-tour-form'>
                    <TextField
                        name="price1"
                        label="Giá cho 1 người lớn"
                        type="number"
                        required
                        fullWidth
                        margin="normal"
                        className='prices-tour-form-item'
                        value={formik.values.price1}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name="price2"
                        label="Giá cho 1 trẻ em"
                        type="number"
                        required
                        fullWidth
                        margin="normal"
                        className='prices-tour-form-item'
                        value={formik.values.price2}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        name="price3"
                        label="Giá cho 1 em bé"
                        type="number"
                        required
                        fullWidth
                        margin="normal"
                        className='prices-tour-form-item'
                        value={formik.values.price3}
                        onChange={formik.handleChange}
                    />

                </div>

                {
                    selectedFiles < 1 ?
                        <div className="upload-image-tour-form">
                            <div className="upload-image-tour"
                                onClick={handleFocusInputFile}
                            >
                                <div>
                                    <img src="https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_960_720.png"
                                        alt="" />
                                </div>
                                <span>Tải 4 tệp ảnh tại đây</span>
                            </div>
                            <input type="file" name="" id=""
                                multiple
                                onChange={handleChangeFiles}
                                ref={inputFileRef}
                            />
                        </div>
                        :
                        <div className="selected-images">
                            <InputLabel>Các tệp đã chọn</InputLabel>
                            {selectedFiles?.map((file, id) => {
                                file.url = URL.createObjectURL(file);
                                return (
                                    <div className='selected-images-item' key={id}>
                                        <img src={file.url} alt="" />
                                    </div>
                                )
                            })}
                            <span className='delete-selected-files'
                                onClick={setEmptySelectedFiles}
                            ><AiFillDelete size={30} /></span>
                        </div>
                }
                <Button
                    type='reset'
                    className='admin-form__btn'
                    onClick={handleResetFormik}
                >
                    Đặt lại
                </Button>
                <Button type="submit"
                    className='admin-form__btn admin-form__btn--submit'
                >
                    Tạo
                </Button>
            </form>
        </div>
    )
}

export default TourCreate