import React, { useEffect, useState } from 'react'
import Tours from '../../../components/global/Tour/Tours'
import { getAllToursByFilterApi } from "../../../api/global/tours.api";
import { createCustomStorage } from "../../../config/localStorageConfig";

const PAGE_SIZE = 12;
const TOUR_STORAGE = "tour_storage"
const CURRENT_PAGE = "currentPage"
const tourPaginate = createCustomStorage(TOUR_STORAGE);
tourPaginate.set(CURRENT_PAGE, 1);
const minDistance = Number(2000000);
const maxPrice = Number(20000000);

const ToursContainer = () => {
    const [tours, setTours] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [fields, setFields] = useState({
        size: PAGE_SIZE,
        pageNumber: tourPaginate.get("currentPage"),
    })

    const [prices, setPrices] = useState({
        minPrice: 0,
        maxPrice: maxPrice
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleOffLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }

    const getAllToursByFilter = (fields) => {
        setIsLoading(true);
        getAllToursByFilterApi(fields)
            .then(res => {
                setTours(res.data.content)
                setTotalPages(res.data.totalPages)
                handleOffLoading()
            })
            .catch(err => {
                handleOffLoading();
            });
    }

    const handleChangePrices = (e) => {
        if (e.target) {
            const name = e.target.name;
            const value = Number(e.target.value)

            if (name === "minPrice" && (value + minDistance) <= maxPrice) {

                if (prices.maxPrice - value < minDistance) {
                    setPrices({
                        ...prices,
                        [name]: value,
                        maxPrice: value + minDistance
                    })
                } else {
                    setPrices({
                        ...prices,
                        [name]: value
                    })
                }
            }

            if (name === "maxPrice" && (value - minDistance) >= 0) {

                if (value - prices.minPrice < minDistance) {
                    setPrices({
                        ...prices,
                        [name]: value,
                        minPrice: value - minDistance
                    })
                } else {
                    setPrices({
                        ...prices,
                        [name]: value
                    })
                }
            }
        }
    }

    const handleChangeFilter = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFields({
                ...fields,
                [name]: value
            });
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
        handleChangeCurrentPage(1);
        for (const key in fields) {
            if (Object.hasOwnProperty.call(fields, key) && fields[key] === '') {
                delete fields[key];
            }
        }
        const newFields = {
            ...fields,
            ...prices
        }
        getAllToursByFilter(newFields);
    }

    useEffect(() => {
        getAllToursByFilter({
            ...fields,
        })
        // eslint-disable-next-line 
    }, [fields.pageNumber])

    return (
        <Tours
            totalPages={totalPages}
            tours={tours}
            fields={fields}
            prices={prices}
            handleChangeCurrentPage={handleChangeCurrentPage}
            handleChangeFilter={handleChangeFilter}
            handleChangePrices={handleChangePrices}
            handleSubmitFilter={handleSubmitFilter}
            isLoading={isLoading}
        />
    )
}

export default ToursContainer