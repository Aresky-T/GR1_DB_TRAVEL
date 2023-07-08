import React from 'react'
import ToursContainer from '../../containers/global/Tour/ToursContainer'
import { Helmet } from 'react-helmet-async'

const TourPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BK Travel - Tour</title>
                <meta name="tour-page" content="BK travel application" />
            </Helmet>
            <ToursContainer />
        </>
    )
}

export default TourPage