import HomeAdminContainer from "../containers/admin/HomeAdminContainer";
import TourManagerContainer from "../containers/admin/TourManagerContainer";
import BookingManager from "../components/admin/BookingManager";
import AccountManager from "../components/admin/AccountManager";
import StaffManager from "../components/admin/StaffManager";
import LoginAdminPage from "../pages/Global/LoginAdminPage";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/Global/HomePage";
import TourPage from "../pages/Global/ToursPage";
import TourDetailsPage from "../pages/Global/TourDetailsPage";
import LoginPage from "../pages/Global/LoginPage";
import RegisterPage from "../pages/Global/RegisterPage";
import SearchResultListPage from "../pages/Global/SearchResultListPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import {ROLE} from "../constant/role";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ProfilePage from "../pages/User/ProfilePage";
import {ROUTE} from "../constant/route";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import TouristAttractionPage from "../pages/Global/TouristAttractionPage";
import TouristAttractionManagerContainer from "../containers/admin/TouristAttractionManagerContainer";
import BlogPage from "../pages/Global/BlogPage";
import BookingPage from "../pages/User/BookingPage";

export const routes = [
    {
        path: ROUTE.HOME_ADMIN,
        element: <LayoutAdmin/>,
        title: 'Admin',
        isPrivate: true,
        role: [ROLE.ADMIN],
        children: [
            {path: '', element: <HomeAdminContainer/>},
            {path: ROUTE.TOUR_MANAGER, element: <TourManagerContainer/>},
            {path: ROUTE.TOURIST_ATTRACTION_MANAGER, element: <TouristAttractionManagerContainer/>},
            {path: ROUTE.BOOKING_MANAGER, element: <BookingManager/>},
            {path: ROUTE.ACCOUNT_MANAGER, element: <AccountManager/>},
            {path: ROUTE.STAFF_MANAGER, element: <StaffManager/>}
        ],
    },
    {
        path: ROUTE.HOME,
        element: <Layout/>,
        isPrivate: false,
        children: [
            {path: '', element: <HomePage/>},
            {path: ROUTE.TOUR, element: <TourPage/>},
            {path: ROUTE.TOUR_DETAIL, element: <TourDetailsPage/>},
            {path: ROUTE.TOURIST_ATTRACTION, element: <TouristAttractionPage/>},
            {path: ROUTE.TOURIST_ATTRACTION_DETAIL, element: <BlogPage/>},
            {path: ROUTE.LOGIN, element: <LoginPage/>},
            {path: ROUTE.REGISTER, element: <RegisterPage/>},
            {path: ROUTE.TOUR_SEARCH, element: <SearchResultListPage/>},
            {path: ROUTE.BOOKING, element: <BookingPage/>},
        ]
    },
    {
        path: ROUTE.HOME,
        element: <Layout/>,
        isPrivate: true,
        role: [ROLE.USER],
        children: [
            {path: ROUTE.PROFILE, element: <ProfilePage/>},
        ]
    },
    {path: ROUTE.LOGIN_ADMIN, element: <LoginAdminPage/>, isPrivate: false},
    {path: '*', element: <NotFoundPage/>, title: '404', is404: true}
].map((route) => {
    if (route.isPrivate){
        return {
            ...route,
            element: (
                <PrivateRoute>
                    {route.element}
                </PrivateRoute>
            )
        }
    }
    return {
        ...route,
        element: (
            <PublicRoute>
                {route.element}
            </PublicRoute>
        )
    }
})