import React from 'react'
import BookedTour from './BookedTour'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import EllipsisLoading from '../../global/Loading/EllipsisLoading'

const Box = styled('div')({
    width: '100%',
    padding: '50px 0',
    textAlign: 'center',
    fontWeight: 700,
    fontStyle: 'italic',
})

const BookedTourList = ({ bookedTours }) => {
    const { ellipsis } = useSelector(state => state.loading);
    return (
        <section className='profile-item profile__booked-tours'>
            <h2 className="profile-item__title">Danh sách tour đã đặt</h2>
            {ellipsis ?
                <Box>
                    <EllipsisLoading />
                </Box>
                :
                <>
                    {[...bookedTours].length < 1 ?
                        <Box>Bạn chưa đặt tour nào!</Box>
                        :
                        <>
                            {[...bookedTours].map((item, index) => (
                                <BookedTour bookedTour={item} key={index} />
                            ))}
                        </>
                    }
                </>
            }
        </section>
    )
}

export default BookedTourList