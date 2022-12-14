import { Modal } from "@mui/material";
import React, { useCallback, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { modalCheckOutServiceState$ } from "../../../redux/selectors/ModalSelector";
import "./ModalAllRequestService.scss";
import { hideModalCheckOutService } from "../../../redux/actions/ModalAction";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../redux/actions/RequestServiceManageAction";
import { DataGrid } from "@mui/x-data-grid";
import { turnDownServiceManageState$ } from "../../../redux/selectors/RequestServiceManageSelector";
import DialogDelete from "../../DialogDelete/DialogDelete";
import ModalListRequestService from "../../ListRequestService/ModalListRequestService.js/ModalListRequestService";
import {
  BOOKED,
  CHECKOUT,
  DONE,
  PROCESSING,
  USER_ROLE,
} from "../../../utils/constants/settingSystem";
import { userState$ } from "../../../redux/selectors/UserSelector";
export default function ModalAllRequestService() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalCheckOutServiceState$);
  const navigate = useNavigate();
  let userInfo = useSelector(userState$);
  let listRequestService = useSelector(turnDownServiceManageState$);
  const onClose = useCallback(() => {
    dispatch(hideModalCheckOutService());
  }, [dispatch]);

  const renderArr = () => {
    let arrNew = [];
    let listRequestServiceNew = listRequestService?.filter(
      (item) => item.orders?.requestServiceType === CHECKOUT && item.orders?.status !== DONE
    );
    listRequestServiceNew?.forEach((item, index) => {
      arrNew.push({
        stt: index + 1,
        id: item.room?.data.id,
        idOrder:item.orders.id,
        booking_id: item.orders?.booking.id,
        requestServiceName: item.orders?.requestServiceName,
        requestServiceType: item.orders?.requestServiceType,
        roomNo: item.room?.data.roomNo,
        dateTime: item.orders?.dateTime.substring(0, 10),
        time: item.orders?.dateTime.substring(10),
        customerName:
          item.primaryCustomer.data.firstName +
          " " +
          item.primaryCustomer.data.middleName +
          " " +
          item.primaryCustomer.data.lastName,
        status: item.orders?.status,
      });
    });
    return arrNew;
  };
  const handleConfirmturnService = useCallback(
    (item) => {
      dispatch(
        actions.confirmCheckOutService.confirmCheckOutServiceRequest({
          info: {
            booking_Id: item.booking_id,
            dateTime: item.dateTime + "" + item.time,
            id: item.idOrder,
            requestServiceName: item.requestServiceName,
            requestServiceType: item.requestServiceType,
            status: PROCESSING,
          },
          // bookingId: bookingId,
        })
      );
      dispatch(hideModalCheckOutService())
    },
    [dispatch]
  );
  const handleCompeleteturnService = useCallback(
    (item) => {
      dispatch(
        actions.confirmCheckOutService.confirmCheckOutServiceRequest({
          info: {
            booking_Id: item.booking_id,
            dateTime: item.dateTime + "" + item.time,
            id: item.idOrder,
            requestServiceName: item.requestServiceName,
            requestServiceType: item.requestServiceType,
            status: DONE,
          },
          // bookingId: bookingId,
        })
      );
      dispatch(hideModalCheckOutService())
    },
    [dispatch]
  );
  const actionColumn = [
    {
      field: "status",
      headerName: "Trạng Thái",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status === "BOOKED"
              ? "Chờ Xác Nhận"
              : params.row.status === "PROCESSING"
              ? "Chờ Xử Lý"
              : "Hoàn Thành"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành Động",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === BOOKED ? (
              <div className="cellAction">
                <div
                  className="confirmButton"
                  onClick={() => handleConfirmturnService(params.row)}
                >
                  Xác Nhận
                </div>
                {/* <div
                  className="cancelButton"
                  //   onClick={() => openRequestServiceModal(params.row.id)}
                >
                  Hủy
                </div> */}
              </div>
            ) : params.row.status === PROCESSING ? (
              <div className="cellAction">
                <div
                  className="doneButton"
                  onClick={() => handleCompeleteturnService(params.row)}
                >
                  Hoàn Thành
                </div>
              </div>
            ) : (
              <div className="cellAction">
              <div
                className="doneButton"
                onClick={() => handleCompeleteturnService(params.row)}
                style={{pointerEvents:"none"}}
              >
                Hoàn Thành
              </div>
            </div>
            )}
          </div>
        );
      },
    },
  ];
  let serviceColumns = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 50,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.stt}</div>;
        },
      },
      {
        field: "roomNo",
        headerName: "Phòng",
        width: 100,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.roomNo}</div>;
        },
      },
      {
        field: "customerName",
        headerName: "Tên Khách",
        width: 200,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus`}>{params.row.customerName}</div>
          );
        },
      },
      {
        field: "requestServiceName",
        headerName: "Tên Dịch Vụ",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">{params.row.requestServiceName}</div>
          );
        },
      },
      {
        field: "dateTime",
        headerName: "Ngày Đặt",
        width: 150,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.dateTime}</div>;
        },
      },
      {
        field: "time",
        headerName: "Thời Gian Thực Hiện",
        width: 200,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.time}</div>;
        },
      },
    ],
    []
  );
  //   const handleConfirmService = useCallback(() => {
  //     dispatch(
  //       actions.confirmRequestService.confirmRequestServiceRequest({
  //         orderId: infoOderDetail.id,
  //         status: infoOderDetail.status,
  //         navigate,
  //       })
  //     );
  //     dispatch(hideModalListService());
  //   }, [infoOderDetail, navigate, dispatch]);
  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        <div className="modalTurnDownService">
          <h2>Dịch vụ check out</h2>
          <hr />
          <DataGrid
            className="datagrid"
            getRowId={(row) => row.id}
            rows={renderArr()}
            columns={serviceColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
          <div className="footer">
            <button className="buttonClose" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </Modal>
      {/* {dialog.isLoading && (
        <DialogDelete onDialog={areUSureDelete} message={dialog.message} />
      )} */}
      <ModalListRequestService />
    </div>
  );
}
