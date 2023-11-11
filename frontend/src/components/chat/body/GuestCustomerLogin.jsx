import React from 'react'
import TextField from '../../styled/TextField';
import { ChatButton } from './ChatBoxBody';
import { GrFormPrevious } from 'react-icons/gr'
import { useDispatch } from 'react-redux';
import { updateChatFields } from '../../../redux/slices/chat.slice';

const GuestCustomerLogin = ({ formData, errors, isConnecting, handleChangeField, handleChangeFormData, handleConnectChat }) => {
    const dispatch = useDispatch();

    return (
        <div className="chat-box_body--customer-info">
            <div style={{ textAlign: "center", position: "relative" }} className='chat-box_body--customer-info_head flex-center'>
                <div className="chat-box__icon" style={{ position: "absolute", left: 0 }}>
                    <button onClick={() => {
                        dispatch(updateChatFields({ type: null }))
                    }}>
                        <GrFormPrevious />
                    </button>
                </div>
                <strong style={{ justifySelf: "center", userSelect: "none" }}>Nhập thông tin</strong>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                handleConnectChat();
            }}>
                <div>
                    <TextField
                        name="fullName"
                        // required={true}
                        label={"Tên khách hàng"}
                        value={formData.fullName}
                        onChange={handleChangeFormData}
                    />
                    <div className="error-message">{errors?.get("fullName")?.message}</div>
                </div>
                <div>
                    <TextField
                        name="email"
                        // required={true}
                        label={"Địa chỉ email"}
                        value={formData.email}
                        onChange={handleChangeFormData}
                    // type={"email"}
                    />
                    <div className="error-message">{errors?.get("email")?.message}</div>
                </div>
                <div>
                    <ChatButton type='submit'>
                        {isConnecting ? "Đang kết nối..." : "Tiếp tục với vai trò khách"}
                    </ChatButton>
                </div>
            </form>
        </div>
    )
}

export default GuestCustomerLogin