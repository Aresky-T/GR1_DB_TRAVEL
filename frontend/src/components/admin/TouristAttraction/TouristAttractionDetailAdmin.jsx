import {Button, TextField} from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {ROUTE} from '../../../constant/route'
import BlogContentForm from './BlogContentForm'

const TouristAttractionDetailAdmin = ({formik, handleDeleteTouristAttraction, addBlogContent, removeBlogContent, handleRestoreOriginal}) => {

    const navigate = useNavigate()

    return (
        <div className='admin-main tourist-attraction-detail-admin'>
            <h1>Chi tiết địa điểm du lịch</h1>
            <div className='back-to-prev-page_btn'>
                <span
                    onClick={() => {
                        navigate(ROUTE.TOURIST_ATTRACTION_MANAGER)
                    }}
                >Quay lại</span>
            </div>
            <form className='admin-main-form tad-admin-form'>
                <TextField
                    name='name'
                    className='tad-admin-item'
                    label='Tên'
                    required
                    margin='normal'
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <TextField
                    name='title'
                    className='tad-admin-item'
                    label='Tiêu đề'
                    required
                    margin='normal'
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <TextField
                    name='intro'
                    className='tad-admin-item--multiline'
                    label='Giới thiệu'
                    required
                    margin='normal'
                    fullWidth
                    multiline
                    maxRows={10}
                    value={formik.values.intro}
                    onChange={formik.handleChange}
                />
                <TextField
                    name='imageUrl'
                    className='tad-admin-item'
                    label='Link ảnh'
                    required
                    margin='normal'
                    fullWidth
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                />
                <h2 className="tad-blog-content__title">Nội dung bài viết</h2>

                {[...formik.values.listContents].map((item, index) => (
                    <BlogContentForm
                        content={item}
                        formik={formik}
                        removeBlogContent={removeBlogContent}
                        key={index}
                    />
                ))}
                <Button type='button'
                        className='admin-form__btn'
                        onClick={addBlogContent}
                >
                    Thêm nội dung
                </Button>
                <Button type='button'
                        className='admin-form__btn'
                        onClick={handleRestoreOriginal}
                >
                    Phục hồi lại
                </Button>
                <Button type='button'
                        className='admin-form__btn'
                        onClick={formik.handleSubmit}
                >
                    Xác nhận chỉnh sửa
                </Button>
                <Button type='button'
                        className='admin-form__btn admin-form__btn--delete'
                        onClick={handleDeleteTouristAttraction}
                >
                    Xóa địa điểm này
                </Button>
            </form>
        </div>
    )
}

export default TouristAttractionDetailAdmin