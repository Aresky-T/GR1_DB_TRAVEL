import React, { Fragment, useEffect, useRef } from 'react'
import ChatItem from './ChatItem';
import { IoMdSend } from 'react-icons/io';
import Box from '../../styled/popup/Box';

const Connected = ({ chatList, formData, handleChangeFormData, handleSubmitSendMessage }) => {
    const chatContentRef = useRef(null);

    function groupMessagesBySentAt(messages) {
        const groupedMessages = new Map();
        const result = [];

        messages.forEach((message) => {
            const sentAt = new Date(message.sentAt);
            const date = new Date(sentAt.getFullYear(), sentAt.getMonth(), sentAt.getDate());
            const dateString = date.toDateString();
            if (groupedMessages.has(dateString)) {
                const existingMessage = groupedMessages.get(dateString);
                existingMessage?.push(message);
            } else {
                groupedMessages.set(dateString, [message])
            }
        })

        groupedMessages.forEach((value, key) => {
            result.push({ date: new Date(key), chats: value })
        })

        return result;
    }

    const renderMessageItem = () => {
        const chatListFilter = groupMessagesBySentAt(chatList);
        if (chatList.length) {
            return chatListFilter.map((item, index) => {
                const { chats, date } = item;
                const today = new Date();
                const dateString = date.toLocaleDateString("vi-VN", { dateStyle: "full" });
                const dateStringLong = date.toLocaleDateString("vi-VN", { dateStyle: "long" })
                return (
                    <Fragment key={index}>
                        <div className="date-of-messages"
                            style={{
                                alignSelf: "center",
                                fontSize: ".7rem",
                                padding: "15px 0",
                            }}
                        >
                            <span>{date.getDate() === today.getDate() ? `Hôm nay, ${dateStringLong}` : dateString}</span>
                        </div>
                        <>
                            {chats.map((chat, index) => (
                                <ChatItem chat={chat} key={index} />
                            ))}
                        </>
                    </Fragment>
                )
            })
        }

        return (
            <Box
                style={{
                    textAlign: "center",
                    fontSize: ".7rem",
                    color: "var(--font-color)",
                    paddingInline: "10px"
                }}>
                <p style={{ fontWeight: 600 }}>{new Date().toLocaleTimeString("vi-VN", { timeStyle: "short" })}</p>
                <p style={{ marginTop: "10px", lineHeight: ".8rem" }}>
                    Chào quý khách đến mới dịch vụ hỗ trợ khách hàng.<br />
                    Để gỡ cuộc trò chuyện này, hãy bấm nút "<b>Kết thúc đoạn chat</b>".
                </p>
            </Box>
        )
    }

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [chatList])

    return (
        <div className="chat-box_body--connected">
            <div className="chat-box_body--connected_content"
                ref={chatContentRef}
            >
                {renderMessageItem()}
            </div>
            <div className="chat-box_body--connected_send-message">
                <form onSubmit={handleSubmitSendMessage}>
                    <input type="text"
                        name='message'
                        required
                        placeholder='Nhập câu hỏi của bạn ở đây...'
                        value={formData.message}
                        onChange={(e) => {
                            const { name, value } = e.target;
                            handleChangeFormData(name, value);
                        }}
                    />
                    <button
                        type='submit'
                        style={formData.message.trim() === "" ? {
                            pointerEvents: "none",
                            backgroundColor: "#ccc"
                        } : {}}
                    >
                        <IoMdSend />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Connected