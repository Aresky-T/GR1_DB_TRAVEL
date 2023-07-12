import React, {useEffect, useState} from 'react'
import Home from '../../../components/global/Home'
import {getLatestTouristAttractionsApi} from "../../../api/global/tourist_attraction.api";
import {getLatestToursApi} from "../../../api/global/tours.api";

const HomeContainer = () => {

    const [featuredTours, setFeaturedTours] = useState([]);
    const [featuredTouristAtt, setFeaturedTouristAtt] = useState([])
    useEffect(() => {
        getLatestToursApi(4)
            .then(res => {
                setFeaturedTours(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        getLatestTouristAttractionsApi(4)
            .then(res => {
                setFeaturedTouristAtt(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Home
            featuredTours={featuredTours}
            touristAttractions={featuredTouristAtt}
        />
    )
}

export default HomeContainer