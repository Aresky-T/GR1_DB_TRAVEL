import React, { useEffect, useState } from 'react'
import TouristAttraction from '../../components/global/TouristAttraction'
import { getAllTouristAttractionsApi, getDataBySearchApi } from '../../api/global/touristAttraction.api';

const TouristAttractionContainer = () => {
  const [touristAttraction, setTouristAttraction] = useState([]);
  const [search, setSearch] = useState('');

  const handleClickToSearch = () => {
    search.trim().length > 0 && getDataBySearchApi(search)
      .then(res => {
        setTouristAttraction(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    (search.trim().length === 0) && getAllTouristAttractionsApi()
      .then(res => {
        setTouristAttraction(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [search])

  return (
    <TouristAttraction
      handleClickToSearch={handleClickToSearch}
      search={search}
      setSearch={setSearch}
      touristAttraction={touristAttraction}
    />
  )
}

export default TouristAttractionContainer