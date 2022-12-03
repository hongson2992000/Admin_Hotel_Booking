import React from 'react'
import ListBookingContainer from '../../component/ListBookingContainer/ListBookingContainer'
import Navbar from '../../component/Navbar/Navbar'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./ListBookingPage.scss"
export default function ListBookingPage() {
  return (
      <div className="main-screenListBookingPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
        <Navbar />
          <ListBookingContainer />
        </div>
      </div>
    </div>
  )
}
