import SidebarContainer from "../../containers/admin/Bar/SidebarContainer";
import NavbarContainer from "../../containers/admin/Bar/NavbarContainer";
import {Outlet} from "react-router-dom";

const LayoutAdmin = () => {

    return (
        <div className='admin-container'>
            <SidebarContainer/>
            <NavbarContainer/>
            <Outlet/>
        </div>
    )
}

export default LayoutAdmin