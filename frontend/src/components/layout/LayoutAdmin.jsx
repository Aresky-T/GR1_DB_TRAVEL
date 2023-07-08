import SidebarContainer from "../../containers/admin/Bar/SidebarContainer";
import NavbarContainer from "../../containers/admin/Bar/NavbarContainer";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LayoutAdmin = () => {

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel - Quản trị</title>
                <meta name="admin-page" content="BK travel application" />
            </Helmet>
            <div className='admin-container'>
                <SidebarContainer />
                <NavbarContainer />
                <Outlet />
            </div>
        </>
    )
}

export default LayoutAdmin