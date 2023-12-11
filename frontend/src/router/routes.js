import HomeAdminContainer from "../containers/admin/Home/HomeAdminContainer";
import TourManagerContainer from "../containers/admin/Tour/TourManagerContainer";
import LoginAdminPage from "../pages/Global/LoginAdminPage";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/Global/HomePage";
import TourPage from "../pages/Global/ToursPage";
import TourDetailsPage from "../pages/Global/TourDetailsPage";
import LoginPage from "../pages/Global/LoginPage";
import RegisterPage from "../pages/Global/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import { ROLE } from "../constant/role";
import { ROUTE } from "../constant/route";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ProfilePage from "../pages/User/ProfilePage";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import TouristAttractionPage from "../pages/Global/TouristAttractionPage";
import TouristAttractionManagerContainer from "../containers/admin/TouristAttraction/TouristAttractionManagerContainer";
import BlogPage from "../pages/Global/BlogPage";
import BookingPage from "../pages/Global/BookingPage";
import ForgotPasswordPage from "../pages/Global/ForgotPasswordPage";
import TouristAttractionDetailAdminContainer
    from "../containers/admin/TouristAttraction/TouristAttractionDetailAdminContainer";
import TouristAttractionCreateContainer from "../containers/admin/TouristAttraction/TouristAttractionCreateContainer";
import TourDetailsAdminContainer from "../containers/admin/Tour/TourDetailsAdminContainer";
import TourCreateContainer from "../containers/admin/Tour/TourCreateContainer";
import TourGuideManagerContainer from "../containers/admin/TourGuide/TourGuideManagerContainer";
import TourGuideDetailsContainer from "../containers/admin/TourGuide/TourGuideDetailsContainer";
import TourGuideCreateContainer from "../containers/admin/TourGuide/TourGuideCreateContainer";
import AccountManagerContainer from "../containers/admin/Account/AccountManagerContainer";
import BookingManagerContainer from "../containers/admin/Booking/BookingManagerContainer";
import BookedTourDetailsAdminContainer from "../containers/admin/Booking/BookedTourDetailsAdminContainer";
import CheckoutPage from "../pages/User/CheckoutPage";
import AccountInfo from "../components/user/profile2/menu";
import BookedTourList from "../components/user/profile2/booked_tour";

export const routes = [
    {
        path: ROUTE.HOME_ADMIN,
        element: <LayoutAdmin />,
        title: 'Admin',
        isPrivate: true,
        role: [ROLE.ADMIN],
        children: [
            { path: '', element: <HomeAdminContainer />, title: "Home" },
            { path: ROUTE.TOUR_MANAGER, element: <TourManagerContainer /> },
            { path: ROUTE.TOURIST_ATTRACTION_MANAGER, element: <TouristAttractionManagerContainer /> },
            { path: ROUTE.BOOKING_MANAGER, element: <BookingManagerContainer /> },
            { path: ROUTE.ACCOUNT_MANAGER, element: <AccountManagerContainer /> },
            { path: ROUTE.TOURIST_ATTRACTION_DETAIL_ADMIN, element: <TouristAttractionDetailAdminContainer /> },
            { path: ROUTE.TOURIST_ATTRACTION_CREATE, element: <TouristAttractionCreateContainer /> },
            { path: ROUTE.TOUR_DETAILS_ADMIN, element: <TourDetailsAdminContainer /> },
            { path: ROUTE.TOUR_CREATE, element: <TourCreateContainer /> },
            { path: ROUTE.STAFF_MANAGER, element: <TourGuideManagerContainer /> },
            { path: ROUTE.TOUR_GUIDE_DETAILS, element: <TourGuideDetailsContainer /> },
            { path: ROUTE.TOUR_GUIDE_CREATE, element: <TourGuideCreateContainer /> },
            { path: ROUTE.BOOKED_TOUR_DETAILS_ADMIN, element: <BookedTourDetailsAdminContainer /> }
        ],
    },
    {
        path: ROUTE.LAYOUT,
        element: <Layout />,
        isPrivate: false,
        children: [
            { path: ROUTE.HOME, element: <HomePage /> },
            { path: ROUTE.TOUR, element: <TourPage /> },
            { path: ROUTE.TOUR_DETAIL, element: <TourDetailsPage /> },
            { path: ROUTE.TOURIST_ATTRACTION, element: <TouristAttractionPage /> },
            { path: ROUTE.TOURIST_ATTRACTION_DETAIL, element: <BlogPage /> },
            { path: ROUTE.LOGIN, element: <LoginPage /> },
            { path: ROUTE.REGISTER, element: <RegisterPage /> },
            { path: ROUTE.BOOKING, element: <BookingPage /> },
            { path: ROUTE.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
            // { path: ROUTE.CONTACT, element: <ContactPage /> }
        ]
    },
    {
        path: ROUTE.LAYOUT,
        element: <Layout />,
        isPrivate: true,
        role: [ROLE.USER],
        children: [
            { path: ROUTE.PROFILE, element: <ProfilePage /> },
            { path: ROUTE.CHECKOUT, element: <CheckoutPage /> },
        ]
    },
    { path: ROUTE.LOGIN_ADMIN, element: <LoginAdminPage />, isPrivate: false },
    { path: '*', element: <NotFoundPage />, title: '404', is404: true }
].map((route) => {
    if (route.isPrivate) {
        return {
            ...route,
            element: (
                <PrivateRoute role={route.role}>
                    {route.element}
                </PrivateRoute>
            )
        }
    }
    return {
        ...route,
        element: (
            <PublicRoute title={route.title}>
                {route.element}
            </PublicRoute>
        )
    }
})