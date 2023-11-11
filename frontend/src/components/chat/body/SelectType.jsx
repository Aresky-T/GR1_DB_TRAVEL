import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { ChatButton } from './ChatBoxBody';
import { useDispatch } from 'react-redux';
import { updateChatField, updateChatStatusField } from '../../../redux/slices/chat.slice';
import { useChat } from '../../../redux/selector';

const SelectType = () => {
    const { chatStatus } = useChat();
    const isConnecting = chatStatus.isConnecting;
    const dispatch = useDispatch();
    return (
        <div className="chat-box_body--select-type">
            <div className="chat-box_body--select-type_main">
                <div>
                    <strong>Đăng nhập</strong>
                    <button onClick={() => {
                        dispatch(updateChatStatusField({ key: "isStarted", value: false }))
                    }}>
                        <AiOutlineClose />
                    </button>
                </div>
                <div>
                    <ChatButton
                        type="button"
                        onClick={() => {
                            dispatch(updateChatField({ key: "type", value: "REGISTERED" }))
                        }}>
                        {isConnecting ? "Đang kết nối..." : "Bạn đã đăng nhập?"}
                    </ChatButton>
                </div>
                <div>
                    <ChatButton
                        type="button"
                        onClick={() => {
                            dispatch(updateChatField({ key: "type", value: "GUEST" }))
                        }}>
                        Tiếp tục với vai trò khách
                    </ChatButton>
                </div>
            </div>
        </div>
    )
}

export default SelectType