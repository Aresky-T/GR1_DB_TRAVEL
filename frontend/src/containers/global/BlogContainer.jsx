import React, { useEffect, useState } from 'react'
import Blog from '../../components/global/Blog'
import { useParams } from 'react-router-dom';
import { getTouristAttractionDetailsApi } from '../../api/global/touristAttraction.api';

const BlogContainer = () => {
    const param = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const id = param.id;
        getTouristAttractionDetailsApi(id)
        .then(res => {
            console.log(res.data)
            setData(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [param]);

    return (
        <Blog touristAttraction={data}/>
    )
}

export default BlogContainer