import { useNavigate } from "react-router-dom"

const TouristAttractionCard = ({ data }) => {

    const navigate = useNavigate();

    return (
        <div className="tourist-attraction-card"
            onClick={() => {
                navigate(`/tourist-attraction/${data.id}`)
            }}
        >
            <div className="tourist-attraction__image">
                <img src={data.imageUrl} alt="" />
            </div>
            <p className="tourist-attraction__name">
                {data.name}
            </p>
        </div>
    )
}

export default TouristAttractionCard