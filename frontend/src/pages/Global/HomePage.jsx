import React from 'react'
import HomeContainer from '../../containers/global/Home/HomeContainer'
import { Helmet } from 'react-helmet-async'

const HomePage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BK Travel - Trang chủ</title>
                <meta name="home-page" content="Helmet application" />
            </Helmet>
            <HomeContainer />
        </>
    )
}

export default HomePage