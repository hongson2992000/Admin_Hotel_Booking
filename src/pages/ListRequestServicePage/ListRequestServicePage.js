import React from 'react'
import ListRequestService from '../../component/ListRequestService/listrequestService'
import Navbar from '../../component/Navbar/Navbar'
import Sidebar from '../../component/Sidebar/Sidebar'
import "./ListRequestServicePage.scss"
export default function ListRequestServicePage() {
    return (
        <div className="main-screen">
            <div className="main-screen">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <ListRequestService />
                </div>
            </div>
        </div>
    )
}
