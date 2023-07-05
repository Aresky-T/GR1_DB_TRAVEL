import React, {useEffect, useState} from 'react'
import TouristAttraction from '../../../components/global/TouristAttraction/TouristAttraction'
import {getDataBySearchApi} from '../../../api/global/tourist_attraction.api';

const TouristAttractionContainer = () => {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState({
        size: 20,
        pageNumber: 1,
        search: ''
    })

    const handleChangeFields = (e) => {
        if (e.target) {
            const {name, value} = e.target;
            setFields({
                ...fields,
                [name]: value
            })
        }
    }

    const handleClickToSearch = () => {
        const newFields = {...fields};
        if (fields.search.trim().length === 0) {
            delete newFields['search'];
        }
        getDataBySearchApi(newFields)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getDataBySearchApi({
            size: 20,
            pageNumber: 1
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <TouristAttraction
            data={data}
            fields={fields}
            handleClickToSearch={handleClickToSearch}
            handleChangeFields={handleChangeFields}
        />
    )
}

export default TouristAttractionContainer