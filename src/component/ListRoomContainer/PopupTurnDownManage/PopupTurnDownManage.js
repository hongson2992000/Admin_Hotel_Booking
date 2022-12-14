import { Modal } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalTurnDownManageState$ } from "../../../redux/selectors/ModalSelector";
import "./PopupTurnDownManage.scss";
import { hideModalTurnDownManage } from "../../../redux/actions/ModalAction";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../redux/actions/RequestServiceManageAction";
import { DataGrid } from "@mui/x-data-grid";
import { turnDownServiceInRoomState$ } from "../../../redux/selectors/RequestServiceManageSelector";
import DialogDelete from "../../DialogDelete/DialogDelete";
import ModalListRequestService from "../../ListRequestService/ModalListRequestService.js/ModalListRequestService";
import { CHECKOUT, DONE, PROCESSING } from "../../../utils/constants/settingSystem";
import { userState$ } from "../../../redux/selectors/UserSelector";
export default function PopupTurnDownManage() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalTurnDownManageState$);
  const navigate = useNavigate();
  let userInfo = useSelector(userState$);
  const onClose = useCallback(() => {
    dispatch(hideModalTurnDownManage());
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
        id: item?.id,
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
        actions.confirmTurnDownService.confirmTurnDownServiceRequest({
          booking_Id: item.booking_Id,
          dateTime: item.dateTime + " " + item.time,
          id: item.id,
          requestServiceName: item.requestServiceName,
          requestServiceType: item.requestServiceType,
          status: PROCESSING,
        })
      );
    },
    [dispatch]
  );
  const handleCompeleteturnService = useCallback(
    (item) => {
      dispatch(
        actions.confirmTurnDownService.confirmTurnDownServiceRequest({
          booking_Id: item.booking_Id,
          dateTime: item.dateTime,
          id: item.id,
          requestServiceName: item.requestServiceName,
          requestServiceType: item.requestServiceType,
          status: DONE,
        })
      );
    },
    [dispatch]
  );
  const actionColumn = [
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
  let serviceColumns = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 150,
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
        width: 250,
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
