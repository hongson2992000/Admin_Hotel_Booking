import React from 'react'
import ListBookingContainer from '../../component/ListBookingContainer/ListBookingContainer'
import Navbar from '../../component/Navbar/Navbar'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./ListBookingPage.scss"
export default function ListBookingPage() {
  return (
    <div className="main-screen">
      <div className="main-screen">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <ListBookingContainer />
        </div>
      </div>
    </div>
  )
}
