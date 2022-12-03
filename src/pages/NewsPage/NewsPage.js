import React from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import NewsContainer from "../../component/NewsContainer/NewsContainer";
import "./NewsPage.scss";
export default function NewsPage() {
  return (
     <div className="main-screenNewPage col-12">
     <div className="row">
       <div className="col-2">
         <Sidebar />
       </div>
       <div className="content-main col-10">
         <Navbar />
         <NewsContainer />
       </div>
     </div>
   </div>
  );
}
