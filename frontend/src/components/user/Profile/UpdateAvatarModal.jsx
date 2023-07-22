import React, { useRef, useState } from 'react'
import { styled } from '@mui/material'
import { uploadSingleFileApi } from '../../../api/global/file.api'
import { useDispatch, useSelector } from 'react-redux'
import { offLoading, onLoading } from '../../../redux/slices/loading.slice'
import { updateAvatarApi } from '../../../api/global/profile.api'
import { authSelector } from '../../../redux/selector'
import toast from 'react-hot-toast'

const CustomModal = styled('div')({
    width: '100vw',
    height: '100vh',
    backgroundColor: '#cccccc59',

    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,

    display: 'flex',
    justifyContent: "center",



    '.update-avatar-modal': {
        width: '500px',
        height: 'fit-content',
        borderRadius: '15px',
        backgroundColor: '#fff',
        marginTop: '100px',
        padding: '15px',
        boxShadow: '0 0 5px rgba(0,0,0, .5)',
        animation: '0.5s dropdownModal forwards',
    },

    '.update-avatar__choose-file': {
        width: '100%',
        height: '100px',
        borderRadius: '10px',
        border: '2px dashed #ccc',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'all 0.2s linear',

        '&:hover': {
            borderStyle: 'solid',
            borderColor: 'var(--primary-color)',
        }
    },

    '.update-avatar__file-selected': {
        width: '100%',
        height: '300px',
        overFlow: 'hidden',
        padding: '15px',
        backgroundColor: 'var(--font-color2)',
        borderRadius: '12px',

        '#update-avatar__img': {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '9px',
            border: 'none',
        }
    },

    '.update-avatar-modal__btn-area': {
        width: '100%',
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '.update-avatar-modal__btn--submit': {
            backgroundColor: 'var(--font-color2)',
            color: '#fff',

            '&:hover': {
                backgroundColor: 'var(--primary-color)',
            },
        },

        '.update-avatar-modal__btn--cancel': {
            border: '1px solid #ccc',
            fontWeight: 600,

            '&:hover': {
                backgroundColor: 'var(--button-color)',
                color: '#fff',
            }
        },
    },
})


const ModalButton = styled('button')({
    padding: '7px 15px',
    border: 'none',
    outline: 'none',
    borderRadius: '5px',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'all 50ms linear',
    letterSpacing: '1px',
})

const UpdateAvatarModal = ({ handleCloseModal, setMessage }) => {
    const [selectedFile, setSelectedFile] = useState();
    const { accessToken } = useSelector(authSelector);
    const fileRef = useRef();
    const dispatch = useDispatch();

    const handleClickChooseFile = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        file.url = URL.createObjectURL(file);
        setSelectedFile(file);
    }

    const handleSubmit = () => {
        dispatch(onLoading());
        uploadSingleFileApi(selectedFile)
            .then(res => {
                return res.data.secure_url;
            })
            .then(url => {
                updateAvatarApi(accessToken, url)
                    .then(res => {
                        dispatch(offLoading());
                        handleCloseModal();
                        setMessage(message => message + 'success');
                        toast.success('Cập nhật ảnh đại diện thành công thành công!')
                    })
                    .catch(err => {
                        handleCloseModal();
                        toast.error('Cập nhật ảnh đại diện thất bại!')
                    })
            })
            .catch(err => {
                handleCloseModal();
                toast.error('Cập nhật ảnh đại diện thất bại!')
                dispatch(offLoading());
            })
    }

    return (
        <CustomModal>
            <div className="update-avatar-modal">
                {selectedFile ?
                    <div className="update-avatar__file-selected">
                        <img src={selectedFile.url} alt=""
                            id='update-avatar__img'
                        />
                    </div>
                    :
                    <div className="update-avatar__choose-file"
                        onClick={handleClickChooseFile}
                    >
                        Click để chọn file
                    </div>
                }
                <input type="file" name="" id=""
                    style={{
                        display: "none"
                    }}
                    ref={fileRef}
                    onChange={handleChangeFile}
                />
                <div className="update-avatar-modal__btn-area">
                    <ModalButton
                        className='update-avatar-modal__btn--submit'
                        onClick={handleSubmit}
                    >
                        Cập nhật
                    </ModalButton>
                    <ModalButton
                        className='update-avatar-modal__btn--cancel'
                        onClick={handleCloseModal}
                    >
                        Hủy bỏ
                    </ModalButton>
                </div>
            </div>
        </CustomModal>
    )
}

export default UpdateAvatarModal