import { Modal } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { modalRequestServiceState$ } from "../../../redux/selectors/ModalSelector";
import "./PopupRequestService.scss";
import {
  hideModalRequestService,
  showModalRequestServiceDetail,
} from "../../../redux/actions/ModalAction";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../redux/actions/RequestServiceManageAction";
import { DataGrid } from "@mui/x-data-grid";
import { requestServiceManageInRoomState$ } from "../../../redux/selectors/RequestServiceManageSelector";
import DialogDelete from "../../DialogDelete/DialogDelete";
import ModalListRequestService from "../../ListRequestService/ModalListRequestService.js/ModalListRequestService";
import {
  BOOKED,
  PROCESSING,
  USER_ROLE,
} from "../../../utils/constants/settingSystem";
import { userState$ } from "../../../redux/selectors/UserSelector";
export default function PopupRequestService() {
  const dispatch = useDispatch();
  let userInfo = useSelector(userState$);
  const isShow = useSelector(modalRequestServiceState$);
  const navigate = useNavigate();
  const listRequestService = useSelector(requestServiceManageInRoomState$);
  const onClose = useCallback(() => {
    dispatch(hideModalRequestService());
  }, [dispatch]);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [idService, setIdService] = useState({
    id: 0,
  });
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const handleCancelService = (id) => {
    handleDialog("Bạn chắc chắn xóa dịch vụ này?", true);
    setIdService({
      id: id,
    });
  };
  //   const areUSureDelete = (choose) => {
  //     if (choose) {
  //       dispatch(
  //         actions.cancelRequestServiceDetailById.cancelRequestServiceDetailByIdRequest(
  //           { orderDetailId: idService, orderId: infoOderDetail.id }
  //         )
  //       );
  //       dispatch(hideModalListService())
  //       handleDialog("", false);
  //     } else {
  //       handleDialog("", false);
  //     }
  //   };
  const renderArr = () => {
    let arrNew = [];
    let listRequestServiceNew = [];
    listRequestService.requestService?.forEach((item,i) => {
        if (
          item.orderDetails[0].service?.id !== 70 &&
          item.orderDetails[0].service?.id !== 71 &&
          item.orderDetails[0].service?.id !== 57 &&
          item.orderDetails[0].service?.id !== 58
        ) {
          listRequestServiceNew.push(item);
        }
 
    });
    listRequestServiceNew?.forEach((item, i) => {
        arrNew.push({
          stt: i + 1,
          id: item.id,
          totalAmount: item.totalAmount,
          createDate: item.createDate?.substring(0, 10),
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
        field: "id",
        headerName: "Mã Hóa Đơn",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },
      {
        field: "totalAmount",
        headerName: "Thành Tiền",
        width: 200,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus`}>{params.row.totalAmount}</div>
          );
        },
      },
      {
        field: "createDate",
        headerName: "Ngày Đặt",
        width: 250,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus`}>{params.row.createDate}</div>
          );
        },
      },
      {
        field: "customerName",
        headerName: "Tên Khách",
        width: 250,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus`}>{params.row.customerName}</div>
          );
        },
      },
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
  const openRequestServiceModal = useCallback(
    (id) => {
      const service = listRequestService.requestService.find(
        (serviceItem) => serviceItem.id === id
      );
      //  let newService = service
      dispatch(
        actions.getRequestServiceById.getRequestServiceByIdRequest(service)
      );
      dispatch(showModalRequestServiceDetail());
    },
    [listRequestService, dispatch]
  );
  const renderActionColoumn = () => {
    let actionColumn = [];
    if (userInfo.userRole !== USER_ROLE.RECEPTIONIST) {
      actionColumn = [

        {
          field: "action",
          headerName: "Hành Động",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <div
                  className="updateButton"
                  onClick={() => openRequestServiceModal(params.row.id)}
                >
                  Xem Chi Tiết
                </div>
                {/* <Link to="" style={{ textDecoration: "none" }}>
                  <div className="viewButton">Xem</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  {" "}
                  Xoá
                </div> */}
              </div>
            );
          },
        },
      ];
    } else {
      actionColumn = [
        // {
        //     field: "status",
        //     headerName: "Trạng Thái",
        //     width: 200,
        //     renderCell: (params) => {
        //       return (
        //         <div className={`cellWithStatus ${params.row.status}`}>
        //           {params.row.status === "BOOKED"
        //             ? "Chờ Xác Nhận"
        //             : params.row.status === "PROCESSING"
        //             ? "Chờ Xử Lý"
        //             : "Hoàn Thành"}
        //         </div>
        //       );
        //     },
        //   },
      ];
    }
    return actionColumn;
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Hành Động",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => openRequestServiceModal(params.row.id)}
            >
              Xem Chi Tiết
            </div>
            {/* <Link to="" style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              {" "}
              Xoá
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        <div className="modalRequestService">
          <h2>Dịch vụ sử dụng</h2>
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
          {/* {dialog.isLoading && (
        <DialogDelete onDialog={areUSureDelete} message={dialog.message} />
      )} */}
          {/* {infoOderDetail.status === "BOOKED" ? (
            <div className="footer">
              <button
                className="buttonConfirm"
                onClick={() => handleConfirmService()}
              >
                <CheckIcon className="icon" />
                Xác Nhận
              </button>
              <button className="buttonClose" onClick={onClose}>
                Đóng
              </button>
            </div>
          ) : infoOderDetail.status === "PROCESSING" ? (
            <div className="footer">
              <button
                className="buttonDone"
                type="submit"
                onClick={() => handleConfirmService()}
              >
                <CheckIcon className="icon" />
                Hoàn Thành
              </button>
              <button className="buttonClose" onClick={onClose}>
                Đóng
              </button>
            </div>
          ) : (
            <div className="footer">
              <button className="buttonClose" onClick={onClose}>
                Đóng
              </button>
            </div>
          )} */}
        </div>
      </Modal>
      {/* {dialog.isLoading && (
        <DialogDelete onDialog={areUSureDelete} message={dialog.message} />
      )} */}
      <ModalListRequestService />
    </div>
  );
}
