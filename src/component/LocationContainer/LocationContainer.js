import React, { useCallback } from "react";
import "./LocationContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/LocationManageAction";
import { locationManageState$ } from "../../redux/selectors/LocationManageSelector";
import AddNewLocationModal from "./AddNewLocationModal/AddNewLocationModal";
import UpdateLocationModal from "./UpdateLocationModal/UpdateLocationModal";
import getImageUrlByType from "../../utils/constants/GetImageUrlByType";
import { showModalAddLocation, showModalUpdateLocation } from "../../redux/actions/ModalAction";
import DialogDelete from "../DialogDelete/DialogDelete";
export default function LocationContainer() {
  const listLocation = useSelector(locationManageState$);
  const dispatch = useDispatch();
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  const renderArr = () => {
    let arrNew = [];
    listLocation?.forEach((item, i) => {
      arrNew.push({
        stt: i + 1,
        id: item.id,
        name: item.name,
        openTime: item.openTime,
        closeTime: item.closeTime,
        status: item.status,
        image: getImageUrlByType(`img_abstraction_${item.id}`)?.pictureUrl,
      });
    });
    return arrNew;
  };
  const handleAddNewLocation = useCallback(() => {
    dispatch(showModalAddLocation());
  }, [dispatch]);
  const handleUpdateLocation = useCallback(
    (id) => {
      let locationItem = listLocation.find((item) => item.id === id);
      dispatch(actions.filInfoLocation.filInfoLocationRequest(locationItem));
      dispatch(showModalUpdateLocation());
    },
    [dispatch, listLocation]
  );
   //Handle Dialog
   const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [idBooking, setIdBooking] = useState({
    id: 0,
  });
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const handleDeleteLocation = useCallback((id) => {
    handleDialog("Bạn chắc chắn muốn xóa ?", true);
    setIdBooking({
      id: id,
    });
  }, []);
  const areUSureCheckOut = (choose) => {
    if (choose) {
      dispatch(
        actions.deleteLocation.deleteLocationRequest({
          id: idBooking.id,
          // navigate: navigate,
        })
      );
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const locationColumns = [
    {
      field: "stt",
      headerName: "STT",
      width: 100,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.stt}</div>;
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
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="" />
          </div>
        );
      },
    },
    {
      field: "openTime",
      headerName: "Giờ Mở",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.openTime}</div>;
      },
    },
    {
      field: "closeTime",
      headerName: "Giờ Đóng",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.closeTime}</div>;
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Hành Động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => handleUpdateLocation(params.row.id)}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Cập nhật</div>
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDeleteLocation(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableLocation">
      <div className="datatableTitle">
        Danh Sách Địa Điểm
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
        rows={renderArr()}
        columns={locationColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <AddNewLocationModal />
      <UpdateLocationModal />
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureCheckOut} message={dialog.message} />
      )}
    </div>
  );
}
