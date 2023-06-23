import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector";
import { Fragment, useEffect, useState } from "react";
import { ROLE } from "../../constant/role";
import logo from "../../assets/logo/png/logo-no-background.png";
import { links } from "../../constant/links";
import Sidebar from "../sidebar/Sidebar";

const Header = () => {

    const account = useSelector(authSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rightLinks, setRightLink] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const mainLinks = links.filter(link => link.align === 'center');

    function handleChangeShowSidebar() {
        setIsShowSidebar(!isShowSidebar);
    }

    useEffect(() => {
        if (account.accessToken && account.role === ROLE.USER) {
            setRightLink(links.filter(link => {
                return link.align === 'right' && link.isPublic === false
            }));
        } else {
            setRightLink(links.filter(link => {
                return link.align === 'right' && link.isPublic === true
            }))
        }

    }, [account])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 0);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className={isScrolled ? 'header main header-fixed' : 'header main'}>
            <div className='header-item logo'
                onClick={() => { navigate('/') }}
            >
                <img src={logo} alt='logo' />
            </div>
            <div className='header-item link-main'>
                {mainLinks.map(link => (
                    <Link
                        to={link.path}
                        key={link.name}
                        className={location.pathname === link.path ? 'link-item active' : 'link-item'}
                    >{link.name}</Link>
                ))}
            </div>
            <div className='header-item link-right'>
                {rightLinks.map((link) => (
                    <Fragment key={link.name}>
                        {link.isPublic ?
                            <Link
                                to={link.path}
                                className={link.title === 'register' ? 'link-item register-link' : 'link-item'}
                            >
                                {link.name}
                            </Link>
                            :
                            <Link
                                to={link.path}
                                className={link.title === 'logout' ? 'link-item logout' : 'link-item'}
                                onClick={link.action ? () => { link.action(dispatch) } : ''}
                            >
                                {link.name}
                            </Link>
                        }
                    </Fragment>
                ))}
            </div>
            <div className={isShowSidebar ? "menu-icon active" : "menu-icon"}
                onClick={handleChangeShowSidebar}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {isShowSidebar && <Sidebar handleChangeShowSidebar={handleChangeShowSidebar} />}
        </div>
    )
}

export default Header