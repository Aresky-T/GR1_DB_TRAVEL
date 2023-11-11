import React from 'react';
import { BsCheckAll } from "react-icons/bs"
import { FaEye } from 'react-icons/fa'

function ChatItem({ chat }) {
    const { sender, status, sentAt, message } = chat;

    return (
        <div className={`chat-item ${chat.sender.toLowerCase()}`}>
            {sender === "EMPLOYEE" &&
                <div className='avatar-sender'>
                    BK
                </div>
            }
            <div className="chat-item_message">
                <p>{message}</p>
                <div style={{
                    fontSize: ".6rem",
                    fontStyle: "italic",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    alignSelf: sender === "CUSTOMER" ? 'flex-end' : "flex-start",
                }}>
                    <span>{new Date(sentAt).toLocaleString("vi-VN", { timeStyle: "short" })}</span>
                    {sender === "CUSTOMER" &&
                        <span style={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            {status === "NEW" ? <BsCheckAll /> : <FaEye />}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatItem;