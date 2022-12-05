import React, { useCallback } from "react";
import "./LocationContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/ModalAction";
import { locationManageState$ } from "../../redux/selectors/LocationManageSelector";
import AddNewLocationModal from "./AddNewLocationModal/AddNewLocationModal";
import UpdateLocationModal from "./UpdateLocationModal/UpdateLocationModal";
export default function LocationContainer() {
  const listLocation = useSelector(locationManageState$);
  const [data, setData] = useState(listLocation);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleAddNewLocation = useCallback(() => {
    dispatch(actions.showModalAddLocation());
  }, [dispatch]);
  const handleUpdateLocation = useCallback(() => {
    dispatch(actions.showModalUpdateLocation());
  }, [dispatch]);
  const locationColumns = [
    {
      field: "id",
      headerName: "STT",
      width: 100,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Tên Địa Điểm",
      width: 350,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.name}</div>;
      },
    },

    {
      field: "img",
      headerName: "Hình Ảnh",
      width: 250,
    },
    {
      field: "openTime",
      headerName: "Giờ mở",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.openTime}</div>;
      },
    },
    {
      field: "closeTime",
      headerName: "Giờ đóng",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.closeTime}</div>;
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => handleUpdateLocation(params.row.id)}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Cập nhật</div>
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableLocation">
      <div className="datatableTitle">
        Danh sách địa điểm
        <div
          onClick={() => {
            handleAddNewLocation();
          }}
          className="link"
        >
          Thêm Địa Điểm
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={listLocation}
        columns={locationColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <AddNewLocationModal />
      <UpdateLocationModal/>
    </div>
  );
}
