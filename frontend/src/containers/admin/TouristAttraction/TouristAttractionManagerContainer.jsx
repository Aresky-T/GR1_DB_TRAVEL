import {useEffect, useState} from "react";
import TouristAttractionManager from "../../../components/admin/TouristAttraction/TouristAttractionManager";
import {getAllTouristAttractionsApi} from "../../../api/global/tourist_attraction.api";

const TouristAttractionManagerContainer = () => {
    const [data, setData] = useState();
    const [fields, setFields] = useState({
        size: 5,
        pageNumber: 1
    })

    const handleChangeCurrentPage = (page) => {
        setFields({
            ...fields,
            pageNumber: page
        });
    }

    useEffect(() => {
        getAllTouristAttractionsApi(fields)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [fields])

    return <TouristAttractionManager
        data={data}
        fields={fields}
        handleChangeCurrentPage={handleChangeCurrentPage}
    />
}

export default TouristAttractionManagerContainer
