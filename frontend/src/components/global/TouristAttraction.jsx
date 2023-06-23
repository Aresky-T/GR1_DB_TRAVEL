import React from 'react'
import headerVideo from '../../assets/video/pexels-aleks-michajlowicz-6907296-1920x1080-25fps.mp4'
import { FiSearch } from 'react-icons/fi'
import TouristAttractionCard from './TouristAttractionCard';

const TouristAttraction = ({ touristAttraction, search, setSearch, handleClickToSearch }) => {

    return (
        <div className='main-session tourist-attraction-container'>
            <section className="main-session-header tourist-attraction-header">
                <div className="header-item tour-att-header__video">
                    <video src={headerVideo} autoPlay loop />
                    <h1>Địa điểm du lịch</h1>
                </div>
                <div className="tour-att-header__filter">
                    <input type="text" name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Tìm kiếm tên địa danh...'
                    />
                    <span className="search-icon"
                        onClick={handleClickToSearch}
                    >
                        <FiSearch />
                    </span>
                </div>
            </section>
            <section className='tourist-attraction-main'>
                {touristAttraction.length > 0 &&
                    <div className="tourist-attraction-list">
                        {[...touristAttraction].map(item => (
                            <TouristAttractionCard data={item} key={item.name} />
                        ))}
                    </div>}
                {touristAttraction.length < 1 &&
                    <div className="empty_result">
                        Không tìm thấy kết quả phù hợp!
                    </div>}
            </section>
        </div>
    )
}

export default TouristAttraction