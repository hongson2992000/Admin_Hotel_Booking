import { useSelector } from "react-redux";
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
import { loadingState$ } from "./redux/selectors/LoadingSelector";

function App() {
  let isLoading = useSelector(loadingState$);
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
