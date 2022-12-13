import React from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./GreetingPage.scss"
import GreetingContainer from '../../component/GreetingContainer/GreetingContainer';
import Navbar from '../../component/Navbar/Navbar';
import GreetingScreen from '../../component/SettingScreen/GreetingScreen/GreetingScreen';
export default function GreetingPage() {
  return (
     <div className="main-screenGreetingPage col-12">
     <div className="row">
       <div className="col-2">
         <Sidebar />
       </div>
       <div className="content-main col-10">
         <Navbar />
         <GreetingScreen/>
       </div>
     </div>
   </div>
  )
}
