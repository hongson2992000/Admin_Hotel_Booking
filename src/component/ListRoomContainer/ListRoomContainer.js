import React from "react";
import Room from "./Room/Room";
import "./ListRoomContainer.scss";
export default function ListRoomContainer() {
  const data = [
    {
      id: 1,
      name: "R001",
      roomNo: "001",
      description: "Phong Standard 001",
      createDate: "28/10/2022",
      updateDate: "28/10/2022",
      createBy: "Duong",
      lastModifyBy: "long",
      hotel_Id: 1,
      roomType_Id: 1,
      status: true,
    },
    {
      id: 2,
      name: "R001",
      roomNo: "001",
      description: "Phong Standard 001",
      createDate: "28/10/2022",
      updateDate: "28/10/2022",
      createBy: "Duong",
      lastModifyBy: "long",
      hotel_Id: 1,
      roomType_Id: 1,
      status: true,
    },
    {
      id: 3,
      name: "R001",
      roomNo: "001",
      description: "Phong Standard 001",
      createDate: "28/10/2022",
      updateDate: "28/10/2022",
      createBy: "Duong",
      lastModifyBy: "long",
      hotel_Id: 1,
      roomType_Id: 1,
      status: true,
    },
    {
      id: 4,
      name: "R001",
      roomNo: "001",
      description: "Phong Standard 001",
      createDate: "28/10/2022",
      updateDate: "28/10/2022",
      createBy: "Duong",
      lastModifyBy: "long",
      hotel_Id: 1,
      roomType_Id: 1,
      status: true,
    },
    {
      id: 5,
      name: "R001",
      roomNo: "001",
      description: "Phong Standard 001",
      createDate: "28/10/2022",
      updateDate: "28/10/2022",
      createBy: "Duong",
      lastModifyBy: "long",
      hotel_Id: 1,
      roomType_Id: 1,
      status: false,
    },
    {
        id: 6,
        name: "R001",
        roomNo: "001",
        description: "Phong Standard 001",
        createDate: "28/10/2022",
        updateDate: "28/10/2022",
        createBy: "Duong",
        lastModifyBy: "long",
        hotel_Id: 1,
        roomType_Id: 1,
        status: false,
      },
  ];
  return (
    <div className="ListRoomContainer col-12">
      <div className="FillterRoom">
        <a href="#">
          <div className="FillterAll">
            <p>Tất Cả</p>
          </div>
        </a>
        <a href="#">
          <div className="FillterEmpty">
            <p>Trống</p>
          </div>
        </a>
        <a href="#">
          <div className="FillterNotEmpty">
            <p>Có Khách</p>
          </div>
        </a>
      </div>
      <div className="col-12 RoomContainer">
        <Room data={data} />
      </div>
    </div>
  );
}
