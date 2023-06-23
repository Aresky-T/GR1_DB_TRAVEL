import React, {useEffect, useState} from 'react'
import Tours from '../../components/global/Tours'
import {getAllToursByFilterApi} from "../../api/global/tours.api";
import {createCustomStorage} from "../../config/localStorageConfig";

const PAGE_SIZE = 12;
const TOUR_STORAGE = "tour_storage"
const CURRENT_PAGE = "currentPage"
const tourPaginate = createCustomStorage(TOUR_STORAGE);
tourPaginate.set(CURRENT_PAGE, 1);

const ToursContainer = () => {
    const [tours, setTours] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [fields, setFields] = useState({
        size: PAGE_SIZE,
        pageNumber: tourPaginate.get("currentPage")
    })

    const getAllToursByFilter = (fields) => {
        getAllToursByFilterApi(fields)
            .then(res => {
                setTours(res.data.content)
                setTotalPages(res.data.totalPages)
            })
            .catch(err => {
                console.log(err)
            });
    }

    const handleChangeFilter = (e) => {
        if (e.target) {
            const {name, value} = e.target;
            if (value.trim().length === 0) {
                const newFields = {...fields};
                delete newFields[name];
                setFields(newFields);
            } else {
                setFields({
                    ...fields,
                    [name]: value
                })
            }
        }
    }
    const handleChangeCurrentPage = (page) => {
        setFields({
            ...fields,
            pageNumber: page
        })
        tourPaginate.set(CURRENT_PAGE, page);
    }
    const handleSubmitFilter = () => {
        setFields({
            ...fields,
            pageNumber: 1
        });
        getAllToursByFilter(fields);
    }

    useEffect(() => {
        getAllToursByFilter({
            ...fields,
            size: PAGE_SIZE,
            pageNumber: fields.pageNumber
        })
        // eslint-disable-next-line 
    }, [fields.pageNumber])

    useEffect(() => {
        if (!fields["destination"] && !fields["startAddress"] && !fields["vehicle"]) {
            getAllToursByFilter({
                size: PAGE_SIZE,
                pageNumber: 1
            });
        }
    }, [fields])

    return (
        <Tours
            totalPages={totalPages}
            tours={tours}
            fields={fields}
            handleChangeCurrentPage={handleChangeCurrentPage}
            handleChangeFilter={handleChangeFilter}
            handleSubmitFilter={handleSubmitFilter}
        />
    )
}

export default ToursContainer