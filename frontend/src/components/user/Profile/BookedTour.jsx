import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles'

const CustomBox = styled('div')({
    padding: '10px 15px',
})

const BookedTourLabel = styled('span')({
    fontSize: '15px',
    fontWeight: 600,
    marginRight: '5px',
})

const BookedTourData = styled('span')({
    fontSize: '15px'
})

const TouristInfo = styled('div')({
    padding: '10px 0',
    marginLeft: '15px',
    lineHeight: '1.3',

    '.tourist-index': {
        fontWeight: '600',
    },

    '.tourist-info-item': {
        color: 'var(--primary-color)',
        paddingInline: '5px'
    }
})


const BookedTour = ({ bookedTour }) => {
    const renderGender = (gender) => {
        let g;
        switch (gender) {
            case 'MALE':
                g = 'Nam';
                break;
            case 'FEMALE':
                g = 'Nữ';
                break;
            default:
        }
        return g;
    }

    const renderStatus = (status) => {
        let newStatus;
        switch (status) {
            case 'NOT_PAY':
                newStatus = "Chưa thanh toán";
                break;
            case 'PAY_UP':
                newStatus = "Đã thanh toán";
                break;
            case 'REJECTED':
                newStatus = "Từ chối đặt tour";
                break;
            default:
        }
        return newStatus;
    }

    return (
        <Accordion sx={{
            border: '1px solid #ccc',
            boxShadow: 'none',
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                <CustomBox>
                    <BookedTourLabel>Mã Tour:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.tourTourCode}</BookedTourData>
                </CustomBox>
            </AccordionSummary>
            <AccordionDetails>
                <CustomBox>
                    <BookedTourLabel>Tên tour:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.tourTitle}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Trạng thái:</BookedTourLabel>
                    <BookedTourData>{renderStatus(bookedTour?.status)}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Ngày đặt:</BookedTourLabel>
                    <BookedTourData>{new Date(bookedTour?.bookTime).toLocaleDateString("vi-VN")}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Tên Người đại diện:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.fullName}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Địa chỉ:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.address}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Email:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.email}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Số điện thoại:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.phone}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Tổng số hành khách:</BookedTourLabel>
                    <BookedTourData>{bookedTour?.totalPersons}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Danh sách hành khách:</BookedTourLabel>
                    <BookedTourData>{[...bookedTour?.touristList].map((tourist, index) => (
                        <TouristInfo key={index}>
                            <span className='tourist-index'>{index + 1}.</span>
                            <span className='tourist-info-item'>{tourist?.fullName}</span>
                            -
                            <span className='tourist-info-item'>{new Date(tourist?.birthDate).toLocaleDateString('vi-VN')}</span>
                            -
                            <span className="tourist-info-item">{renderGender(tourist?.gender)}</span>
                        </TouristInfo>
                    ))}</BookedTourData>
                </CustomBox>
                <CustomBox>
                    <BookedTourLabel>Tổng chi phí:</BookedTourLabel>
                    <BookedTourData>{Number(bookedTour?.totalPrice).toLocaleString('vi-VN')} VND</BookedTourData>
                </CustomBox>

            </AccordionDetails>
        </Accordion>
    )
}

export default BookedTour