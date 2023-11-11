import { logout } from "../redux/slices/auth.slice";
import { onCancelChat } from "../redux/slices/chat.slice";
import { removeProfile } from "../redux/slices/profile.slice";
import { ROUTE } from "./route";

export const links = [
    {
        name: 'Trang Chủ',
        title: 'home',
        path: ROUTE.HOME,
        isPublic: true,
        align: 'center',
        class: 'home-link'
    },
    {
        name: 'Tour',
        title: 'tour',
        path: ROUTE.TOUR,
        isPublic: true,
        align: 'center',
        class: 'tour-link'
    },
    {
        name: 'Tham quan',
        title: 'tourist-attraction',
        path: ROUTE.TOURIST_ATTRACTION,
        isPublic: true,
        align: 'center',
        class: 'tourist-attraction-link'
    },
    // {
    //     name: 'Liên hệ',
    //     title: 'contact',
    //     path: ROUTE.CONTACT,
    //     isPublic: true,
    //     align: 'center',
    //     class: 'contact-link'
    // },
    {
        name: 'Đăng nhập',
        title: 'login',
        path: ROUTE.LOGIN,
        isPublic: true,
        align: 'right',
        class: 'login-link'
    },
    {
        name: 'Đăng ký',
        title: 'register',
        path: ROUTE.REGISTER,
        isPublic: true,
        align: 'right',
        class: 'register-link link-btn'
    },
    {
        name: 'Hồ sơ',
        title: 'profile',
        path: ROUTE.PROFILE,
        isPublic: false,
        align: 'right',
        class: 'profile-link'
    },
    {
        name: 'Đăng xuất',
        title: 'logout',
        isPublic: false,
        align: 'right',
        class: 'link-btn',
        action: (dispatch) => {
            dispatch(removeProfile());
            dispatch(onCancelChat());
            dispatch(logout());
        }
    },
]