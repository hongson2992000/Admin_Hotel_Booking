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
import PopupSucess from "./component/PopupSuccess/PopupSuccess";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import ListRequestServicePage from "./pages/ListRequestServicePage/ListRequestServicePage";
import { useEffect } from "react";
import AccountPage from "./pages/AccountPage/AccountPage";
import ListTurnDownServicePage from "./pages/ListTurnDownServicePage/ListTurnDownServicePage";
import AlarmPage from "./pages/AlarmPage/AlarmPage";
import InfomationHotelPage from "./pages/InfomationHotelPage/InfomationHotelPage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import SetupRoomPage from "./pages/SetupRoomPage/SetupRoomPage";
import SetUpPricePage from "./pages/SetUpPricePage/SetUpPricePage";
// import InfomationCustomerPage from "./pages/InfomationCustomerPage/InfomationCustomerPage";
import InfomationCustomerContainer from "./component/InfomationCustomerContainer/InfomationCustomerContainer";
import ListCustomerContainer from "./component/ListCustomerContainer/ListCustomerContainer";
import ListRoomContainer from "./component/ListRoomContainer/ListRoomContainer";
import SetUpPriceRoomByDatePage from "./pages/SetUpPriceRoomByDatePage/SetUpPriceRoomByDatePage";
import CreateNewRoomContainer from "./component/CreateNewRoomContainer/CreateNewRoomContainer";
import {
  modalCheckOutErrorState$,
  modalErrorState$,
} from "./redux/selectors/ModalSelector";
import PopupError from "./component/PopupError/PopupError";
import ServicePage from "./pages/ServicePage/ServicePage";
import ListBookingPage from "./pages/ListBookingPage/ListBookingPage";
import ListBookingContainer from "./component/ListBookingContainer/ListBookingContainer";
import CheckInContainer from "./component/CheckInContainer/CheckInContainer";
import PopupCheckOutError from "./component/PopupCheckOutError/PopupCheckOutError";
import FirebaseTest from "./firebase/FirebaseTest";

function App() {
  let isLoading = useSelector(loadingState$);
  let isSuccess = useSelector(successState$);
  let isError = useSelector(modalErrorState$);
  let isCheckOutErr = useSelector(modalCheckOutErrorState$);
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
      {isError ? <PopupError /> : ""}
      {isCheckOutErr ? <PopupCheckOutError /> : ""}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute isLogged={userLocal} />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/overview" element={<HomePage />} />
            <Route path="/service" element={<ServicePage />} />
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
              <Route
                path="createNewRoom/:roomNo/:roomId"
                element={<CreateNewRoomContainer />}
              />
            </Route>
            <Route path="/listBooking" element={<ListBookingPage />}>
              <Route path="checkIn" element={<CheckInContainer />} />
              <Route index element={<ListBookingContainer />} />
            </Route>

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
            <Route
              path="/setUpPriceRoomByDate"
              element={<SetUpPriceRoomByDatePage />}
            />
          </Route>
          <Route path="/uploadImage" element={<FirebaseTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
