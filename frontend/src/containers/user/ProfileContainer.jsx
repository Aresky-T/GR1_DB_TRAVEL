import React, { useEffect, useState } from 'react'
import Profile from '../../components/user/Profile'
import { getProfileApi, updateProfileApi } from '../../api/global/profile.api';
import { getAllBookedToursApi } from '../../api/user/booking.api';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';
import { useFormik } from 'formik';
import { offEllipsis, onEllipsis } from '../../redux/slices/loading.slice';
import toast from 'react-hot-toast';

const ProfileContainer = () => {
  const [profile, setProfile] = useState({});
  const [bookedTours, setBookedTours] = useState([]);
  const { accessToken } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
    },
    onSubmit: values => {
      updateProfileApi(accessToken, values)
        .then(res => {
          setMessage(message => message + 'success')
          toast.success("Cập nhật thành công!")
        })
        .catch(err => {
          setMessage(message => message + 'error')
          toast.error("Cập nhật thất bại")
        })
    }
  })

  useEffect(() => {
    if (accessToken) {
      getProfileApi(accessToken)
        .then((res) => {
          const data = res.data;
          const obj = { ...formik.values };
          for (const key in data) {
            if (Object.hasOwnProperty.call(obj, key)) {
              obj[key] = data[key];
            }
          }
          formik.setValues(obj);
          setProfile(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //eslint-disable-next-line
  }, [accessToken, message]);

  useEffect(() => {
    if (accessToken) {
      dispatch(onEllipsis());
      getAllBookedToursApi(accessToken)
        .then((res) => {
          setBookedTours(res.data);
          dispatch(offEllipsis());
        })
        .catch((err) => {
          console.log(err);
          dispatch(offEllipsis());
        });
    }
    //eslint-disable-next-line
  }, [accessToken]);

  return (
    <Profile
      bookedTours={bookedTours}
      formik={formik}
      profile={profile}
    />
  )
}

export default ProfileContainer