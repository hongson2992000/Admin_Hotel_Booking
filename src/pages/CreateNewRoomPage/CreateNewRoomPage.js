import React from 'react'
import CreateNewRoomContainer from '../../component/CreateNewRoomContainer/CreateNewRoomContainer'
import Navbar from '../../component/Navbar/Navbar'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./CreateNewRoomPage.scss"
export default function CreateNewRoomPage() {
  return (
    <div className="main-screenCreateNewRoom col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <CreateNewRoomContainer/>
        </div>
      </div>
    </div>
  )
}
