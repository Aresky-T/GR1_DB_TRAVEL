import React from 'react'
import TouristAttractionContainer from '../../containers/global/TouristAttraction/TouristAttractionContainer'
import { Helmet } from 'react-helmet-async'

const TouristAttractionPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel - Điểm tham quan</title>
                <meta name="tour-detail-page" content="BK travel application" />
            </Helmet>
            <TouristAttractionContainer />
        </>
    )
}

export default TouristAttractionPage