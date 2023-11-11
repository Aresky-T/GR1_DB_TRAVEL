import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import MailContainer from "../../containers/mail/MailContainer";
import ChatContainer from "../../containers/chat/ChatContainer";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <MailContainer />
            <ChatContainer />
        </>
    )
}

export default Layout