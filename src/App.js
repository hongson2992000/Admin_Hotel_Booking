import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./component/Loading/Loading";
import GreetingPage from "./pages/GreetingPage/GreetingPage";
import HomePage from "./pages/HomePage/HomePage";
// import ListBookingPage from "./pages/ListBookingPage/ListBookingPage";
import ListRoomPage from "./pages/ListRoomPage/ListRoomPage";
import LocationPage from "./pages/LocationePage/LocationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewsPage from "./pages/NewsPage/NewsPage";
// import ServicePage from "./pages/ServicePage/ServicePage";
import {
  loadingState$,
  successState$,
} from "./redux/selectors/LoadingSelector";
import { USER_LOGIN, USER_ROLE } from "./utils/constants/settingSystem";
import * as actions from "./redux/actions/LoginAction";
import * as actionImage from "./redux/actions/ImageManageAction";
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
import SetUpPricePage from "./pages/SetUpPricePage/SetUpPricePage";
import InfomationCustomerPage from "./pages/InfomationCustomerPage/InfomationCustomerPage";
import InfomationCustomerContainer from "./component/InfomationCustomerContainer/InfomationCustomerContainer";
import ListCustomerContainer from "./component/ListCustomerContainer/ListCustomerContainer";
import ListRoomContainer from "./component/ListRoomContainer/ListRoomContainer";
import SetUpPriceRoomByDatePage from "./pages/SetUpPriceRoomByDatePage/SetUpPriceRoomByDatePage";
const LazyServicePage = React.lazy(() =>
  import("./pages/ServicePage/ServicePage")
);
const LazyListBookingPage = React.lazy(() =>
  import("./pages/ListBookingPage/ListBookingPage")
);
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
            <Route path="/account" element={<AccountPage />} />
            <Route path="/overview" element={<HomePage />} />
            <Route
              path="/service"
              element={
                <React.Suspense fallback="...Loading">
                  <LazyServicePage />
                </React.Suspense>
              }
            />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/greeting" element={<GreetingPage />} />
            <Route path="/infomationHotel" element={<InfomationHotelPage />} />

            <Route path="/roomManage" element={<ListRoomPage />}>
            <Route
                path="customerDetail"
                element={<InfomationCustomerContainer />}
              />
              <Route index element={<ListRoomContainer />} />
              <Route path="createNewRoom" element={<CreateNewRoomPage />} />
            </Route>
            <Route
              path="/listBooking"
              element={
                <React.Suspense fallback="...Loading">
                  <LazyListBookingPage />
                </React.Suspense>
              }
            />
            <Route path="/checkIn" element={<CheckInPage />} />
            
            <Route path="/customerManage" element={<CustomerPage />}>
              <Route
                path=":customerId"
                element={<InfomationCustomerContainer />}
              />
              <Route index element={<ListCustomerContainer />} />
            </Route>
            <Route path="/alarm" element={<AlarmPage />} />

            {/* <Route  path="/checkCustomerInfo" element={<CustomerPage />} /> */}
            <Route
              path="/listrequestService"
              element={<ListRequestServicePage />}
            />
            <Route
              path="/listrequestServiceStaff"
              element={<ListRequestServicePage />}
            />
            <Route
              path="/listTurnDownService"
              element={<ListTurnDownServicePage />}
            />
            <Route path="/setUpRoom" element={<SetupRoomPage />} />
            <Route path="/setUpPriceRoom" element={<SetUpPricePage />} />
            <Route path="/setUpPriceRoomByDate" element={<SetUpPriceRoomByDatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
