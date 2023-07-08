import React from 'react'
import TourDetailsContainer from "../../containers/global/Tour/TourDetailsContainer";
import { Helmet } from 'react-helmet-async';

const TourDetailsPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel - Chi tiết Tour</title>
                <meta name="tour-detail-page" content="BK travel application" />
            </Helmet>
            <TourDetailsContainer />
        </>
    )
}

export default TourDetailsPage