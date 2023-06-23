import { logout } from "../redux/slices/auth.slice";
import { ROUTE } from "./route";

export const links = [
    {
        name: 'Trang Chủ',
        title: 'home',
        path: ROUTE.HOME,
        isPublic: true,
        align: 'center',
    },
    {
        name: 'Tour',
        title: 'tour',
        path: ROUTE.TOUR,
        isPublic: true,
        align: 'center',
    },
    {
        name: 'Tham quan',
        title: 'tourist-attraction',
        path: ROUTE.TOURIST_ATTRACTION,
        isPublic: true,
        align: 'center',
    },
    {
        name: 'Đăng nhập',
        title: 'login',
        path: ROUTE.LOGIN,
        isPublic: true,
        align: 'right'
    },
    {
        name: 'Đăng ký',
        title: 'register',
        path: ROUTE.REGISTER,
        isPublic: true,
        align: 'right',
    },
    {
        name: 'Hồ sơ',
        title: 'profile',
        path: ROUTE.PROFILE,
        isPublic: false,
        align: 'right'
    },
    {
        name: 'Đăng xuất',
        title: 'logout',
        path: '',
        isPublic: false,
        align: 'right',
        action : (dispatch) => {
            dispatch(logout())
        }
    }
]