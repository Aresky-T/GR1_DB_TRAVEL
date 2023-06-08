import {Routes, Route, BrowserRouter} from "react-router-dom";
import LoginAdminPage from "./pages/admin/LoginAdminPage";
import HomeAdminPage from "./pages/admin/HomeAdminPage";
import HomePage from "./pages/Global/HomePage";
import TourManager from "./components/admin/TourManager";
import AccountManager from "./components/admin/AccountManager";
import TouristAttraction from "./components/admin/TouristAttraction";
import BookingManager from "./components/admin/BookingManager";
import React from "react";
import { Toaster } from "react-hot-toast";
import StaffManager from "./components/admin/StaffManager";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomeAdminContainer from "./containers/admin/HomeAdminContainer";
import TourManagerContainer from "./containers/admin/TourManagerContainer";
import Loading from "./components/global/Loading";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path="/admin">
                <Route path="" element={<HomeAdminPage/>}>
                  <Route path="" element={<HomeAdminContainer/>}/>
                  <Route path="tour-manager" element={<TourManagerContainer />} />
                  <Route path="tourist-attraction-manager" element={<TouristAttraction />} />
                  <Route path="booking-manager" element={<BookingManager />} />
                  <Route path="account-manager" element={<AccountManager />} />
                  <Route path="staffs-manager" element={<StaffManager/>}/>
                </Route>
                <Route path="login" element={<LoginAdminPage />} />
              </Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
        <Toaster
            position="top center"
        />
        <Loading/>
    </>
  );
}

export default App;
