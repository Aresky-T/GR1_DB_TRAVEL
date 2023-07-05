import {Button, TextField} from '@mui/material';
import BlogContentForm from './BlogContentForm';
import {useNavigate} from 'react-router-dom';
import {ROUTE} from '../../../constant/route';


const TouristAttractionCreate = ({formik, addBlogContent, removeBlogContent}) => {
    const navigate = useNavigate();

    return (
        <div className="admin-main tourist-attraction-create-container">
            <h1>Thêm mới Địa điểm du lịch</h1>
            <div className='back-to-prev-page_btn'>
                <span
                    onClick={() => {
                        navigate(ROUTE.TOURIST_ATTRACTION_MANAGER)
                    }}
                >Quay lại</span>
            </div>
            <form
                className='create-tourist-att__form'
                onSubmit={formik.handleSubmit}
            >
                <TextField label="Tên"
                           name='name'
                           required
                           fullWidth
                           margin='normal'
                           value={formik.values.name}
                           onChange={formik.handleChange}
                />

                <TextField label="Tiêu đề"
                           name='title'
                           required
                           fullWidth
                           margin='normal'
                           value={formik.values.title}
                           onChange={formik.handleChange}
                />

                <TextField label="Link ảnh"
                           name='imageUrl'
                           required
                           fullWidth
                           margin='normal'
                           value={formik.values.imageUrl}
                           onChange={formik.handleChange}
                />

                <TextField
                    label="Giới thiệu"
                    name='intro'
                    multiline
                    minRows={3}
                    required
                    fullWidth
                    margin='normal'
                    value={formik.values.intro}
                    onChange={formik.handleChange}
                />
                <h3 className='blog-content-create-title'>Nội dung bài viết:</h3>
                {formik.values.listContents?.map((content, index) => (
                    <BlogContentForm index={index} key={index}
                                     content={content}
                                     removeBlogContent={removeBlogContent}
                                     formik={formik}
                    />
                ))}
                <Button type="button"
                        onClick={addBlogContent}
                        className='admin-form__btn'
                >
                    Thêm nội dung bài viết
                </Button>

                <Button type="submit"
                        className='admin-form__btn admin-form__btn--submit'
                >Tạo</Button>
            </form>
        </div>
    )
}

export default TouristAttractionCreate