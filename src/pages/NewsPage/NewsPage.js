import React, { useEffect } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import NewsContainer from "../../component/NewsContainer/NewsContainer";
import "./NewsPage.scss";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import AddNewsModal from "../../component/NewsContainer/AddNewsModal/AddNewsModal";
import UpdateNewsModal from "../../component/NewsContainer/UpdateNewsModal/UpdateNewsModal";
export default function NewsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/news");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RECEPTIONIST
    ) {
      navigate("/roomManage");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
    ) {
      navigate("/roomManage");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
    ) {
      navigate("/roomManage");
    }
  }, [navigate]);
  return (
     <div className="main-screenNewPage col-12">
     <div className="row">
       <div className="col-2">
         <Sidebar />
       </div>
       <div className="content-main col-10">
         <Navbar />
         <NewsContainer />
         <AddNewsModal/>
         <UpdateNewsModal/>
       </div>
     </div>
   </div>
  );
}
