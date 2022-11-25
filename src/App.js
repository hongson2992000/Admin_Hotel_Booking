import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./component/Loading/Loading";
import GreetingPage from "./pages/GreetingPage/GreetingPage";
import HomePage from "./pages/HomePage/HomePage";
import ListBookingPage from "./pages/ListBookingPage/ListBookingPage";
import ListRoomPage from "./pages/ListRoomPage/ListRoomPage";
import LocationPage from "./pages/LocationePage/LocationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import ServicePage from "./pages/ServicePage/ServicePage";
import { loadingState$ } from "./redux/selectors/LoadingSelector";
import { USER_LOGIN, USER_ROLE } from "./utils/constants/settingSystem";
import * as actions from "./redux/actions/LoginAction";
import CheckInPage from "./pages/CheckInPage/CheckInPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage"
function App() {
  let isLoading = useSelector(loadingState$);
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = localStorage.getItem(USER_LOGIN);
    if (userInfo) {
      dispatch(actions.login.loginSuccess(JSON.parse(userInfo)));
    }
    // if (userInfo && JSON.parse(userInfo).userRole === USER_ROLE.ADMIN) {
    //   navigate("overview");
    // }
  }, [dispatch]);
  return (
    <div className="App">
      {isLoading ? <Loading /> : ""}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route exact path="/overview" element={<HomePage />} />
          <Route exact path="/service" element={<ServicePage />} />
          <Route exact path="/location" element={<LocationPage />} />
          <Route exact path="/news" element={<NewsPage />} />
          <Route exact path="/greeting" element={<GreetingPage />} />
          <Route exact path="/listBooking" element={<ListBookingPage />} />
          <Route exact path="/listRoom" element={<ListRoomPage />} />
          <Route exact path="/checkIn" element={<CheckInPage />} />
          <Route exact path="/checkCustomerInfo" element={<CustomerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
