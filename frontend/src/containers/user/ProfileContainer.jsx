import React, { useEffect, useState } from 'react'
import Profile from '../../components/user/Profile'
import { updateProfileApi } from '../../api/global/profile.api';
import { getAllBookedToursApi } from '../../api/user/booking.api';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, useProfile } from '../../redux/selector';
import { useFormik } from 'formik';
import { offEllipsis, onEllipsis } from '../../redux/slices/loading.slice';
import toast from 'react-hot-toast';
import { getProfileThunk } from '../../redux/slices/profile.slice';

const ProfileContainer = () => {
  const profile = useProfile();
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
      dispatch(getProfileThunk(accessToken));
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

  useEffect(() => {
    const form = { ...formik.values };
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(profile, key)) {
        form[key] = profile[key];
      }
    }
    formik.setValues(form);
    //eslint-disable-next-line
  }, [profile])

  return (
    <Profile
      bookedTours={bookedTours}
      formik={formik}
      profile={profile}
      setMessage={setMessage}
    />
  )
}

export default ProfileContainer