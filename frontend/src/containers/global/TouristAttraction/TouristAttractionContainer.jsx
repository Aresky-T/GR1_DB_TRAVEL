import React, { useEffect, useState } from 'react'
import TouristAttraction from '../../../components/global/TouristAttraction/TouristAttraction'
import { getDataBySearchApi } from '../../../api/global/tourist_attraction.api';

const TouristAttractionContainer = () => {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState({
        size: 20,
        pageNumber: 1,
        search: ''
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleOffLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }

    const handleChangeFields = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFields({
                ...fields,
                [name]: value
            })
        }
    }

    const getData = (fields) => {
        setIsLoading(true);
        getDataBySearchApi(fields)
            .then(res => {
                handleOffLoading();
                setData(res.data);
            })
            .catch(err => {
                handleOffLoading();
            })
    }

    const handleClickToSearch = () => {
        const newFields = { ...fields };
        if (fields.search.trim().length === 0) {
            delete newFields['search'];
        }
        setIsLoading(true)
        getData(newFields);
    }


    useEffect(() => {
        const newFields = {
            ...fields,
        };
        if (newFields.search.trim() === "") {
            delete newFields['search'];
        }
        getData({ ...newFields });
        //eslint-disable-next-line
    }, [fields.search])

    return (
        <TouristAttraction
            data={data}
            fields={fields}
            handleClickToSearch={handleClickToSearch}
            handleChangeFields={handleChangeFields}
            isLoading={isLoading}
        />
    )
}

export default TouristAttractionContainer