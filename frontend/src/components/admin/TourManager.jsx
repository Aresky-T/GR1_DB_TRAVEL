import React, { useRef } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiFillDelete } from 'react-icons/ai';


const TourManager = (props) => {

  const inputFileRef = useRef();

  const handleFocusInputFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }


  return (
    <div className='admin-main tour-manager'>
      <div className="create-tour">
        <button className="create-tour-btn" onClick={props.handleOpen}>Thêm mới Tour</button>
      </div>
      <div className="tour-manager-data-table">
        <DataGrid
          paginationModel={props.paginationModel}
          onPaginationModelChange={props.setPaginationModel}
          rows={props.rows}
          columns={props.columns}
          autoHeight
          // checkboxSelection
          onRowSelectionModelChange={props.handleSelectionChange}
        />
      </div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        className='create-tour-modal'
      >
        <div
          className='create-tour-form-fields'
        >
          <h2>Thêm mới Tour</h2>
          <form onSubmit={props.handleSubmit}>
            <TextField
              name="title"
              label="Tiêu đề"
              value={props.tourForm.title}
              onChange={props.handleChangeForm}
              required
              fullWidth
              margin="normal"
            />

            <div className="time-tour-form">
              <TextField
                name="startTime"
                label="Thời gian khởi hành"
                type="text"
                value={props.tourForm.startTime}
                onChange={props.handleChangeForm}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                name="time"
                label="Tổng thời gian"
                type="text"
                value={props.tourForm.time}
                onChange={props.handleChangeForm}
                required
                fullWidth
                margin="normal"
              />
            </div>

            <TextField
              name="startAddress"
              label="Địa điểm khởi hành"
              type="text"
              value={props.tourForm.startAddress}
              onChange={props.handleChangeForm}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              name="destinationList"
              label="Danh sách điểm đến"
              type="text"
              value={props.tourForm.destinationList}
              onChange={props.handleChangeForm}
              required
              fullWidth
              margin="normal"
            />

            <div className="scheduleDes-tour-form">
              <InputLabel>Mô tả lịch trình</InputLabel>
              <ReactQuill
                name="scheduleDescription"
                theme="snow"
                value={props.tourForm.scheduleDescription}
                onChange={props.handleChangeForm}
              />
            </div>

            <TextField
              name="totalSeats"
              label="Tổng số chỗ"
              type="number"
              value={props.tourForm.totalSeats}
              onChange={props.handleChangeForm}
              required
              fullWidth
              margin="normal"
            />

            <div className='prices-tour-form'>
              <TextField
                name="price1"
                label="Giá cho 1 người lớn"
                type="number"
                value={props.tourForm.price1}
                onChange={props.handleChangeForm}
                required
                fullWidth
                margin="normal"
                className='prices-tour-form-item'
              />

              <TextField
                name="price2"
                label="Giá cho 1 trẻ em"
                type="number"
                value={props.tourForm.price2}
                onChange={props.handleChangeForm}
                required
                fullWidth
                margin="normal"
                className='prices-tour-form-item'
              />

              <TextField
                name="price3"
                label="Giá cho 1 em bé"
                type="number"
                value={props.tourForm.price3}
                onChange={props.handleChangeForm}
                required
                fullWidth
                margin="normal"
                className='prices-tour-form-item'
              />

            </div>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='vehicle-tour-form'>
              <InputLabel id="vehicle-select-small-label">Phương tiện</InputLabel>
              <Select
                labelId="vehicle-select-small-label"
                id="demo-select-small"
                name='vehicle'
                value={props.tourForm.vehicle}
                onChange={props.handleChangeForm}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Máy bay">Máy bay</MenuItem>
                <MenuItem value="Xe du lịch">Xe du lịch</MenuItem>
                <MenuItem value="Máy bay, Xe du lịch">Cả hai</MenuItem>
              </Select>
            </FormControl>

            {
              props.selectedFiles < 1 ?
                <div className="upload-image-tour-form">
                  <div className="upload-image-tour"
                    onClick={handleFocusInputFile}
                  >
                    <div>
                      <img src="https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_960_720.png" alt="" />
                    </div>
                    <span>Tải 4 tệp ảnh tại đây</span>
                  </div>
                  <input type="file" name="" id=""
                    multiple
                    onChange={props.handleFileChange}
                    ref={inputFileRef}
                  />
                </div>
                :
                <div className="selected-images">
                  <InputLabel>Các tệp đã chọn</InputLabel>
                  {props.selectedFiles?.map((url, id) => (
                    <div className='selected-images-item' key={id}>
                      <img src={url} alt="" />
                    </div>
                  ))}
                  <span className='delete-selected-files'
                    onClick={props.setEmptySelectedFiles}
                  ><AiFillDelete size={30} /></span>
                </div>
            }
            <Button type="submit" className='tour-create-submit-form'>Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default TourManager