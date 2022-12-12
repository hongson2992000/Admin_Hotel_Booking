import React, { useCallback } from "react";
import "./SetUpPriceRoomContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/DataTableNews";
import { useState } from "react";
import getImageUrlByType from "../../utils/constants/GetImageUrlByType";
import { useSelector } from "react-redux";
import { setUpRoomTypeManageState$ } from "../../redux/selectors/SetUpRoomPriceManageSelector";
export default function SetUpPriceRoomContainer() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleUpdateRoom = useCallback(() => {});
  const listRoom = useSelector(setUpRoomTypeManageState$);
  const renderArr = () => {
    let arrNew = [];
    listRoom.forEach((item, i) => {
      arrNew.push({
        stt: i + 1,
        id: item.id,
        name: item.name,
        defaultPrice:item.defaultPrice,
        description: item.description,
        maxOccupancy: item.maxOccupancy,
        // name: item.name,
        // status: item.status,
        // image: getImageUrlByType(`img_room_${item.room.id}`)?.pictureUrl,
      });
    });
    return arrNew;
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => handleUpdateRoom(params.row.id)}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Cập nhật</div>
            </div>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const setUpRoomTypeColumns = [
    {
      field: "stt",
      headerName: "STT",
      width: 5,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.stt}</div>;
      },
    },
    {
      field: "name",
      headerName: "Loại phòng",
      width: 250,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.name}</div>;
      },
    },
    {
      field: "maxOccupancy",
      headerName: "Số khách tối da",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.maxOccupancy}</div>;
      },
    },
    {
      field: "defaultPrice",
      headerName: "Giá/1 ngày",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.defaultPrice}</div>;
      },
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 350,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.description}</div>;
      },
    },

  ];
  return (
    <div className="datatableSetUpPriceRoomContainer">
      <div className="datatableTitle">Cấu hình giá</div>
      <DataGrid
        className="datagrid"
        rows={renderArr()}
        columns={setUpRoomTypeColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
}
