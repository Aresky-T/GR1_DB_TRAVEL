import React from 'react'
import vnImage from '../../assets/image/Flag-map_of_Vietnam.png'
import video1 from '../../assets/video/video1.mp4'
import video2 from '../../assets/video/video2.mp4'
import video3 from '../../assets/video/video3.mp4'
import TourCard from "./Tour/TourCard";
import TouristAttractionCard from "./TouristAttraction/TouristAttractionCard";
import LoadingIndicator from './Loading/LoadingIndicator'

const Home = ({ featuredTours, touristAttractions }) => {

    return (
        <div className='main-session home-container'>
            <section className='home_header'>
                <div className="home_header_left">
                    <div className="subtitle">
                        <span className="title">
                            Đưa bạn đến mọi miền đất nước
                        </span>
                        <img src={vnImage} alt="vn" />
                    </div>
                    <h1>Du lịch mở ra cánh cửa để đem lại những <span className="highlight">kỷ niệm</span></h1>
                    <p>
                        Việt Nam - đất nước thiên nhiên tuyệt đẹp, con người thân thiện.<br />
                        Hãy đi và khám phá vẻ đẹp của núi rừng, biển cả và cảnh quan từ phố thị tới đồng quê.
                        Trải nghiệm văn hóa và sự ấm áp từ người dân mọi miền.
                    </p>
                </div>
                <div className="home_header_right">
                    <div className="hero_image-box">
                        <video src={video1} className='video_1' autoPlay={true} loop />
                    </div>
                    <div className="hero_image-box">
                        <video src={video2} className='video_2' autoPlay={true} loop />
                    </div>
                    <div className="hero_image-box">
                        <video src={video3} className='video_3' autoPlay={true} loop />
                    </div>
                </div>
            </section>
            <section className="home_main">
                <div className="featured tour">
                    <div className="subtitle">
                        <span className="title">Khám phá</span>
                        <h1>Tour nổi bật</h1>
                    </div>
                    {featuredTours.length > 0 ?
                        <div className="featured-list featured__list-1">
                            {[...featuredTours].map(tour => (
                                <TourCard tour={tour} key={tour.id} />
                            ))}
                        </div>
                        :
                        <LoadingIndicator />
                    }
                </div>
                <div className="featured tourist_attraction">
                    <div className="subtitle">
                        <h1>Điểm đến nổi bật</h1>
                    </div>
                    {touristAttractions.length > 0 ?
                        <div className="featured-list featured__list-2">
                            {[...touristAttractions].map(item => (
                                <TouristAttractionCard data={item} key={item.id} />
                            ))}
                        </div>
                        :
                        <LoadingIndicator />
                    }
                </div>
            </section>
        </div>
    )
}

export default Home