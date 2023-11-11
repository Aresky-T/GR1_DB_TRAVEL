import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector";
import { useCallback, useEffect, useState } from "react";
import { ROLE } from "../../constant/role";
import logo from "../../assets/logo/png/logo-no-background.png";
import { links } from "../../constant/links";
import Sidebar from "../sidebar/Sidebar";

const Header = () => {

    const account = useSelector(authSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [publicLinks, setPublicLinks] = useState([]);

    function handleChangeShowSidebar() {
        setIsShowSidebar(!isShowSidebar);
    }

    const onFilterLinks = useCallback((links) => {
        const isLoggedIn = account.accessToken != null && account.role === ROLE.USER;
        return links.map(link => {
            switch (link.title) {
                case "login":
                    link.isPublic = !isLoggedIn;
                    break;
                case "register":
                    link.isPublic = !isLoggedIn;
                    break;
                case "logout":
                    link.isPublic = isLoggedIn;
                    break;
                case "profile":
                    link.isPublic = isLoggedIn;
                    break;
                default:
                    break;
            }

            return link;
        }).filter(link => link.isPublic);
    }, [account])

    const renderLinks = (links) => {
        return links.map(link => {
            const current = location.pathname === link.path ? "active" : "";
            if (link.path) {
                return (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`link-item ${link.align} ${current} ${link.class}`}
                    >
                        {link.name}
                    </Link>
                )
            } else {
                return (
                    <button
                        key={link.name}
                        className={`link-item ${link.class}`}
                        onClick={() => {
                            link.action(dispatch);
                        }}
                    >
                        {link.name}
                    </button>
                )
            }
        })
    }

    const renderCenterLinks = () => {
        const centerLinks = publicLinks.filter(link => link.align === "center");
        return renderLinks(centerLinks);
    }

    const renderRightLinks = () => {
        const rightLinks = publicLinks.filter(link => link.align === "right");
        return renderLinks(rightLinks);
    }

    useEffect(() => {
        const filterLinks = onFilterLinks(links);
        setPublicLinks(filterLinks)
    }, [onFilterLinks])

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
            <div className='header__item logo'
                onClick={() => { navigate('/') }}
            >
                <img src={logo} alt='logo' />
            </div>
            <div className='header__item center-links'>
                {renderCenterLinks()}
            </div>
            <div className='header__item right-links'>
                {renderRightLinks()}
            </div>
            <div className={isShowSidebar ? "menu-icon active" : "menu-icon"}
                onClick={handleChangeShowSidebar}
            >
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            {isShowSidebar && <Sidebar
                handleChangeShowSidebar={handleChangeShowSidebar}
                publicLinks={publicLinks}
            />}
        </div>
    )
}

export default Header