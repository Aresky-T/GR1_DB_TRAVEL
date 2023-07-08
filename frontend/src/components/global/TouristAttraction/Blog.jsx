import React, { useEffect, useState } from 'react'
import { GiPencil } from 'react-icons/gi'

const Blog = ({ touristAttraction }) => {

    const [contents, setContents] = useState([]);

    useEffect(() => {
        setContents(touristAttraction.listContents)
    }, [touristAttraction])

    useEffect(() => {
        if(touristAttraction.title){
            document.title = `BK Travel | ${touristAttraction.title}`
        }
    }, [touristAttraction])

    return (
        <div className='main-session blog-container'>
            <section className='blog-header'>
                <div className="blog-header__image">
                    <img src={touristAttraction.imageUrl} alt="" />
                </div>
                <div className="blog-header__title">
                    <div className="created_date">
                        <span>{new Date(touristAttraction.createdTime).toLocaleDateString('vi-VN', { dateStyle: 'full' })}</span>
                        <GiPencil />
                    </div>
                    <h1 className='title'>{touristAttraction.title}</h1>
                </div>
            </section>
            <section className="blog-content">
                <div className="blog-content__intro">
                    {touristAttraction.intro}
                </div>
                <div className="blog-content__list-item">
                    {contents?.map((item, id) => (
                        <div className='blog-content-item'
                            key={item.id}
                        >
                            <h3 className="title">{id + 1}. {item.subTitle}</h3>
                            <div className='blog-content__image'>
                                <img src={item.image} alt="" />
                            </div>
                            <p className="text">{item.content}</p>
                        </div>
                    ))}
                </div>
                <div className="dividing-line">-------------- Kết thúc --------------</div>
            </section>
        </div>
    )
}

export default Blog