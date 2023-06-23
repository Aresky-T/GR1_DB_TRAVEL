import React, {useEffect, useState} from 'react'
import Home from '../../components/global/Home'
import {getAllTouristAttractionsApi} from "../../api/global/touristAttraction.api";
import {getAllToursApi} from "../../api/global/tours.api";

const HomeContainer = () => {

  const [featuredTours, setFeaturedTours] = useState([]);
  const [featuredTouristAtt, setFeaturedTouristAtt] = useState([])
  useEffect(() => {
    getAllToursApi()
        .then(res => {
          setFeaturedTours(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  }, [])
  useEffect(() => {
    getAllTouristAttractionsApi()
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