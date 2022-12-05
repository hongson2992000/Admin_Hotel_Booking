import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./component/Loading/Loading";
import GreetingPage from "./pages/GreetingPage/GreetingPage";
import HomePage from "./pages/HomePage/HomePage";
import ListBookingPage from "./pages/ListBookingPage/ListBookingPage";
import ListRoomPage from "./pages/ListRoomPage/ListRoomPage";
import LocationPage from "./pages/LocationePage/LocationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import ServicePage from "./pages/ServicePage/ServicePage";
import {
  loadingState$,
  successState$,
} from "./redux/selectors/LoadingSelector";
import { USER_LOGIN, USER_ROLE } from "./utils/constants/settingSystem";
import * as actions from "./redux/actions/LoginAction";
import CheckInPage from "./pages/CheckInPage/CheckInPage";
import PopupSucess from "./component/PopupSuccess/PopupSuccess";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import ListRequestServicePage from "./pages/ListRequestServicePage/ListRequestServicePage";
import { useEffect } from "react";
import AccountPage from "./pages/AccountPage/AccountPage";
import ListTurnDownServicePage from "./pages/ListTurnDownServicePage/ListTurnDownServicePage";
import AlarmPage from "./pages/AlarmPage/AlarmPage";
import CreateNewRoomPage from "./pages/CreateNewRoomPage/CreateNewRoomPage";
import InfomationHotelPage from "./pages/InfomationHotelPage/InfomationHotelPage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import SetupRoomPage from "./pages/SetupRoomPage/SetupRoomPage";

function App() {
  let isLoading = useSelector(loadingState$);
  let isSuccess = useSelector(successState$);
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem(USER_LOGIN);
  const userInfo = JSON.parse(userLocal);
  useEffect(() => {
    if (userInfo) {
      dispatch(actions.login.loginSuccess(userInfo));
    }
    // if (userInfo && JSON.parse(userInfo).userRole === USER_ROLE.ADMIN) {
    //   navigate("overview");
    // }
  }, [userInfo, dispatch]);
  return (
    <div className="App">
      {isLoading ? <Loading /> : ""}
      {isSuccess ? <PopupSucess /> : ""}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute isLogged={userLocal} />}>
            <Route exact path="/account" element={<AccountPage />} />
            <Route exact path="/overview" element={<HomePage />} />
            <Route exact path="/service" element={<ServicePage />} />
            <Route exact path="/location" element={<LocationPage />} />
            <Route exact path="/news" element={<NewsPage />} />
            <Route exact path="/greeting" element={<GreetingPage />} />
            <Route
              exact
              path="/infomationHotel"
              element={<InfomationHotelPage />}
            />

            <Route exact path="/listRoom" element={<ListRoomPage />} />
            <Route exact path="/listBooking" element={<ListBookingPage />} />
            <Route exact path="/checkIn" element={<CheckInPage />} />
            <Route
              exact
              path="/createNewRoom"
              element={<CreateNewRoomPage />}
            />
            <Route exact path="/listCustomer" element={<CustomerPage />} />
            <Route exact path="/alarm" element={<AlarmPage />} />

            {/* <Route exact path="/checkCustomerInfo" element={<CustomerPage />} /> */}
            <Route
              exact
              path="/listrequestService"
              element={<ListRequestServicePage />}
            />
            <Route
              exact
              path="/listrequestServiceStaff"
              element={<ListRequestServicePage />}
            />
            <Route
              exact
              path="/listTurnDownService"
              element={<ListTurnDownServicePage />}
            />
            <Route
              exact
              path="/setupRoom"
              element={<SetupRoomPage />}
            />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
