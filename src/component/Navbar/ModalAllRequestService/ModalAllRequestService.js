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
      headerName: "Tr???ng Th??i",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status === "BOOKED"
              ? "Ch??? X??c Nh???n"
              : params.row.status === "PROCESSING"
              ? "Ch??? X??? L??"
              : "Ho??n Th??nh"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "H??nh ?????ng",
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
                  X??c Nh???n
                </div>
                {/* <div
                  className="cancelButton"
                  //   onClick={() => openRequestServiceModal(params.row.id)}
                >
                  H???y
                </div> */}
              </div>
            ) : params.row.status === PROCESSING ? (
              <div className="cellAction">
                <div
                  className="doneButton"
                  onClick={() => handleCompeleteturnService(params.row)}
                >
                  Ho??n Th??nh
                </div>
              </div>
            ) : (
              <div className="cellAction">
              <div
                className="doneButton"
                onClick={() => handleCompeleteturnService(params.row)}
                style={{pointerEvents:"none"}}
              >
                Ho??n Th??nh
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
        headerName: "Ph??ng",
        width: 100,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.roomNo}</div>;
        },
      },
      {
        field: "customerName",
        headerName: "T??n Kh??ch",
        width: 200,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus`}>{params.row.customerName}</div>
          );
        },
      },
      {
        field: "requestServiceName",
        headerName: "T??n D???ch V???",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">{params.row.requestServiceName}</div>
          );
        },
      },
      {
        field: "dateTime",
        headerName: "Ng??y ?????t",
        width: 150,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.dateTime}</div>;
        },
      },
      {
        field: "time",
        headerName: "Th???i Gian Th???c Hi???n",
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
          <h2>D???ch v??? check out</h2>
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
              ????ng
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
