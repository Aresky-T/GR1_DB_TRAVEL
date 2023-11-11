import ChatIcon from "../../components/chat/ChatIcon";
// import ChatBoxContainer from "./chatbox/ChatBoxContainer";
import { useChat } from "../../redux/selector";
import { useDispatch } from "react-redux";
import { onHiddenChatBox, onShowChatBox } from "../../redux/slices/chat.slice";
import ChatBoxContainer2 from "./chatbox/ChatBoxContainer2";

const ChatContainer = () => {
    const chat = useChat();
    const dispatch = useDispatch();

    const handleShowChat = () => {
        dispatch(onShowChatBox())
    };
    const handleHiddenChat = () => {
        dispatch(onHiddenChatBox())
    };

    return (
        <div className="customer-support-container chat-container">
            <ChatIcon handleShowChat={handleShowChat} />
            {/* <ChatBoxContainer isShowChat={chat.isShowBox} handleHiddenChat={handleHiddenChat} /> */}
            <ChatBoxContainer2 isShowChat={chat.isShowBox} handleHiddenChat={handleHiddenChat} />
        </div>
    )
}

export default ChatContainer