import React, { useCallback } from "react";
import "./SetUpRoomContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpRoomManageState$ } from "../../redux/selectors/SetUpRoomPriceManageSelector";
import getImageUrlByType from "../../utils/constants/GetImageUrlByType";
import AddNewRoomModal from "./AddNewRoomModal/AddNewRoomModal";
import UpdateRoomModal from "./UpdateRoomModal/UpdateRoomModal";
import {
  showModalAddNewRoom,
  showModalUpdateRoom,
} from "../../redux/actions/ModalAction";
import * as actions from "../../redux/actions/RoomManageAction";
import DialogDelete from "../DialogDelete/DialogDelete";
export default function SetUpRoomContainer() {
  const dispatch = useDispatch();
  const listRoom = useSelector(setUpRoomManageState$);
  const handleAddNewRoom = useCallback(() => {
    dispatch(showModalAddNewRoom());
  }, [dispatch]);
  const handleUpdateRoom = useCallback(
    (id) => {
      let roomItem = listRoom.find((item) => item.room.id === id);
      dispatch(actions.filInfoRoom.filInfoRoomRequest(roomItem));
      dispatch(showModalUpdateRoom());
    },
    [dispatch, listRoom]
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
  const handleDeleteRoom = useCallback((id) => {
    handleDialog("Bạn chắc chắn muốn xóa ?", true);
    setIdBooking({
      id: id,
    });
  }, []);
  const areUSureCheckOut = (choose) => {
    if (choose) {
      // dispatch(
      //   actions.deleteLocation.deleteLocationRequest({
      //     id: idBooking.id,
      //     // navigate: navigate,
      //   })
      // );
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const renderArr = () => {
    let arrNew = [];
    listRoom.forEach((item, i) => {
      arrNew.push({
        stt: i + 1,
        id: item.room.id,
        roomType: item.roomType.data.name,
        description: item.roomType.data.description,
        maxAdult: item.roomType.data.maxAdult,
        maxChildren: item.roomType.data.maxChildren,
        maxOccupancy: item.roomType.data.maxOccupancy,
        image: getImageUrlByType(`img_room_${item.room.id}`)?.pictureUrl,
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
              onClick={() => handleDeleteRoom(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  const seuUpRoomColumns = [
    {
      field: "stt",
      headerName: "STT",
      width: 100,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.stt}</div>;
      },
    },
    {
      field: "roomType",
      headerName: "Loại phòng",
      width: 300,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.roomType}</div>;
      },
    },

    {
      field: "img",
      headerName: "Hình Ảnh",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="img" />
          </div>
        );
      },
    },
    {
      field: "maxAdult",
      headerName: "Người lớn tối da",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.maxAdult}</div>;
      },
    },
    {
      field: "maxChildren",
      headerName: "Trẻ em tối da",
      width: 150,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.maxChildren}</div>;
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
  ];
  return (
    <div className="datatableSetupRoomContainer">
      <div className="datatableTitle">
        Danh sách phòng
        <span
          className="link"
          onClick={() => {
            handleAddNewRoom();
          }}
        >
          Thêm Phòng
        </span>
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(row) => row.id}
        rows={renderArr()}
        columns={seuUpRoomColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <AddNewRoomModal />
      <UpdateRoomModal />
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureCheckOut} message={dialog.message} />
      )}
    </div>
  );
}
