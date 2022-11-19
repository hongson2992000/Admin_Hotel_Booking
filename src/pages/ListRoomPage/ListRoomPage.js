import React from 'react'
import ListRoomContainer from '../../component/ListRoomContainer/ListRoomContainer'
import Navbar from '../../component/Navbar/Navbar'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./ListRoomPage.scss"
export default function ListRoomPage() {
  return (
    <div className="main-screen">
      <div className="main-screen">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <ListRoomContainer />
        </div>
      </div>
    </div>
  )
}
