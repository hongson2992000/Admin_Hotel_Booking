import { Modal } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { modalTurnDownServiceState$ } from "../../../redux/selectors/ModalSelector";
import "./PopupTurnDownService.scss";
import { hideModalTurnDown } from "../../../redux/actions/ModalAction";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../redux/actions/RequestServiceManageAction";
import { DataGrid } from "@mui/x-data-grid";
import { turnDownServiceInRoomState$ } from "../../../redux/selectors/RequestServiceManageSelector";
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
export default function PopupTurnDownService({ bookingId }) {
  const dispatch = useDispatch();
  const isShow = useSelector(modalTurnDownServiceState$);
  const navigate = useNavigate();
  let userInfo = useSelector(userState$);
  const onClose = useCallback(() => {
    dispatch(hideModalTurnDown());
  }, [dispatch]);
  const listRequestService = useSelector(turnDownServiceInRoomState$);
  // useEffect(() => {
  //   dispatch(actions.getTurnDownService.getTurnDownServiceRequest());
  // }, [dispatch]);

  const renderArr = () => {
    let arrNew = [];
    let listRequestServiceNew = listRequestService.turnDownService?.filter(
      (item) => item.requestServiceType !== CHECKOUT
    );
    listRequestServiceNew?.forEach((item, index) => {
      arrNew.push({
        stt: index + 1,
        id: item.id,
        booking_Id: item.booking?.id,
        requestServiceName: item.requestServiceName,
        requestServiceType: item.requestServiceType,
        roomNo: item.booking?.room?.roomNo,
        dateTime: item.dateTime.substring(0, 10),
        time: item.dateTime.substring(10),
        customerName:
          listRequestService.primaryCustomer?.firstName +
          " " +
          listRequestService.primaryCustomer?.middleName +
          " " +
          listRequestService.primaryCustomer?.lastName,
        status: item.status,
      });
    });
    return arrNew;
  };

  const handleConfirmturnService = useCallback(
    (item) => {
      dispatch(
        actions.confirmTurnDownServiceStaff.confirmTurnDownServiceStaffRequest({
          info: {
            booking_Id: item.booking_Id,
            dateTime: item.dateTime + " " + item.time,
            id: item.id,
            requestServiceName: item.requestServiceName,
            requestServiceType: item.requestServiceType,
            status: PROCESSING,
          },
          bookingId: bookingId,
        })
      );
      dispatch(hideModalTurnDown())
    },
    [dispatch, bookingId]
  );
  const handleCompeleteturnService = useCallback(
    (item) => {
      dispatch(
        actions.confirmTurnDownServiceStaff.confirmTurnDownServiceStaffRequest({
          info: {
            booking_Id: item.booking_Id,
            dateTime: item.dateTime + " " + item.time,
            id: item.id,
            requestServiceName: item.requestServiceName,
            requestServiceType: item.requestServiceType,
            status: DONE,
          },
          bookingId: bookingId,
        })
      );
      dispatch(hideModalTurnDown())
    },
    [dispatch, bookingId]
  );
  // Render Data of table
  const renderActionColoumn = () => {
    let actionColumn = [];
    if (userInfo.userRole !== USER_ROLE.RECEPTIONIST) {
      actionColumn = [
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
                  ""
                )}
              </div>
            );
          },
        },
      ];
    } else {
      actionColumn = [
        {
          field: "status",
          headerName: "Tr???ng Th??i",
          width: 200,
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
      ];
    }
    return actionColumn;
  };
  // const handleCancelService = useCallback(
  //   (id) => {
  //     dispatch(
  //       actions.cancelRequestServiceDetailById.cancelRequestServiceDetailByIdRequest(
  //         { orderDetailId: id, orderId: infoOderDetail.id }
  //       )
  //     );
  //     dispatch(hideModalListService())
  //   },
  //   [infoOderDetail, dispatch]
  // );
  let serviceColumns = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 100,
        renderCell: (params) => {
          return <div className={`cellWithStatus`}>{params.row.stt}</div>;
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
        width: 200,
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
          <h2>D???ch v??? s??? d???ng</h2>
          <hr />
          <DataGrid
            className="datagrid"
            getRowId={(row) => row.id}
            rows={renderArr()}
            columns={serviceColumns.concat(renderActionColoumn())}
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
