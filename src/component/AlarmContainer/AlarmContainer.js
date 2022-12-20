import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./AlarmContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/AlarmManageAction";
import { roomAlarmManageState$ } from "../../redux/selectors/AlarmManageSelector";
import { DataGrid } from "@mui/x-data-grid";
import DialogDelete from "../DialogDelete/DialogDelete";
import * as Yup from "yup";
import UpdateAlarmModal from "./UpdateAlarmModal/UpdateAlarmModal";
import { showModalUpdateAlarm } from "../../redux/actions/ModalAction";
export default function AlarmContainer() {
  const dispatch = useDispatch();
  const arrRoomAlarm = useSelector(roomAlarmManageState$);
  useEffect(() => {
    dispatch(actions.getAllRoomAlarm.getAllRoomAlarmRequest());
  }, [dispatch]);
  const onSubmitRoomAlarm = useCallback(
    (values) => {
      let dateString = values.dateTime.substring(0, 10);
      let date = dateString.split("-");
      let formatDate = date[2] + "/" + date[1] + "/" + date[0];
      const alarm = {
        booking_Id: values.booking_Id,
        dateTime: formatDate + " " + values.dateTime.substring(11) + ":00",
        id: 0,
        status: true,
      };
      console.log("ALARM", alarm);
      dispatch(actions.createNewAlarm.createNewAlarmRequest(alarm));
    },
    [dispatch]
  );
  const handleUpdateAlarm = useCallback(
    (id) => {
      let alarmItem ;
      let arrRoomNew = [];
      arrRoomNew = arrRoomAlarm?.filter((item) => item.room.status === true);
      arrRoomNew?.forEach((item) => {
        alarmItem = item.alarm.data?.find((itemAlarm) => itemAlarm.id === id);
      });
      console.log("ALARM", alarmItem)
      console.log("ALARM", id)
      dispatch(actions.fillInFoAlarm.fillInFoAlarmRequest(alarmItem));
      dispatch(showModalUpdateAlarm())
    },
    [dispatch, arrRoomAlarm]
  );
  const formik = useFormik({
    initialValues: {
      booking_Id: "",
      dateTime: "",
      id: 0,
      status: true,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitRoomAlarm(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      booking_Id: Yup.string().required("Yêu cầu *"),
      dateTime: Yup.string().required("Yêu cầu *"),
    }),
    enableReinitialize: true,
  });
  const renderArrRoom = () => {
    let arrRoomNew = [];
    arrRoomNew = arrRoomAlarm?.filter((item) => item.room.status === true);
    return arrRoomNew;
  };
  const renderArr = () => {
    let arrRoomNew = [];
    let arrNew = [];
    arrRoomNew = arrRoomAlarm?.filter((item) => item.room.status === true);
    arrRoomNew?.forEach((item) => {
      item.alarm?.data.forEach((itemAlarm, i) => {
        arrNew.push({
          stt: i + 1,
          id: itemAlarm.id,
          roomNo: item.room.roomNo,
          datetime: itemAlarm.dateTime,
          status: itemAlarm.status,
        });
      });
    });
    return arrNew;
  };
  let serviceColumns = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.stt}</div>;
        },
      },
      {
        field: "roomNo",
        headerName: "Phòng",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomNo}</div>;
        },
      },
      {
        field: "datetime",
        headerName: "Giờ báo thức",
        width: 350,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.datetime}</div>;
        },
      },
      {
        field: "status",
        headerName: "Trạng Thái",
        width: 250,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status === true ? "Bật" : "Tắt"}
            </div>
          );
        },
      },
    ],
    []
  );
  const actionColumn = [
    {
      field: "action",
      headerName: "Hành Động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => handleUpdateAlarm(params.row.id)}
            >
              Cập nhật
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDeleteAlarm(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
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
  const handleDeleteAlarm = useCallback((id) => {
    handleDialog("Bạn chắc chắn muốn xóa ?", true);
    setIdBooking({
      id: id,
    });
  }, []);
  const areUSureCheckOut = (choose) => {
    if (choose) {
      dispatch(
        actions.deleteAlarm.deleteAlarmRequest({
          id: idBooking.id,
          // navigate: navigate,
        })
      );
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  return (
    <div className="AlarmContainer">
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 simpleModalItem">
            <div className="row">
              <div className="col-4">
                <InputLabel>Giờ Báo Thức</InputLabel>
                <input
                  className="title"
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  value={formik.values.dateTime}
                  onChange={formik.handleChange}
                />
                {formik.errors.dateTime && (
                  <span style={{ color: "red" }}>{formik.errors.dateTime}</span>
                )}
              </div>
              <div className="col-4 simpleModalItem">
                <InputLabel>Phòng</InputLabel>
                <Select
                  className="title"
                  required
                  id="booking_Id"
                  name="booking_Id"
                  value={formik.values.booking_Id}
                  onChange={formik.handleChange}
                >
                  {renderArrRoom().map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.booking.data?.id}>
                        {item.room.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.errors.booking_Id && (
                  <span style={{ color: "red" }}>
                    {formik.errors.booking_Id}
                  </span>
                )}
              </div>
            </div>
            <div className="footer">
              <button className="buttonSave" type="submit">
                Lưu
              </button>
              {/* <button className="buttonClose" onClick={onClose}>
              Đóng
            </button> */}
            </div>
          </div>
        </div>
      </form>
      <DataGrid
        className="datagrid"
        getRowId={(row) => row.id}
        rows={renderArr()}
        columns={serviceColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureCheckOut} message={dialog.message} />
      )}
      <UpdateAlarmModal/>
    </div>
  );
}
