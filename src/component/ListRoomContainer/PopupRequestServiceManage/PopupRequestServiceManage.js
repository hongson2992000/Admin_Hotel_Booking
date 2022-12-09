import { Modal } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { modalRequestServiceManageState$ } from "../../../redux/selectors/ModalSelector";
import "./PopupRequestServiceManage.scss";
import {
  hideModalRequestServiceManage,
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
export default function PopupRequestServiceManage() {
  const dispatch = useDispatch();
  let userInfo = useSelector(userState$);
  const isShow = useSelector(modalRequestServiceManageState$);
  const navigate = useNavigate();
  const listRequestService = useSelector(requestServiceManageInRoomState$);
  const onClose = useCallback(() => {
    dispatch(hideModalRequestServiceManage());
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
    // listRequestService.forEach((item)=>{
    //     item.orderDetails.find((itemOrder)=>)
    // })
    listRequestService?.forEach((item, i) => {
      arrNew.push({
        stt: i + 1,
        id: item.id,
        roomNo: item.booking?.room?.roomNo,
        // serviceName:item.
        totalAmount: item.totalAmount,
        createDate: item.createDate,
        customerName: item.createBy,
        // listRequestService.customer.firstName +
        // "" +
        // listRequestService.customer.middleName +
        // "" +
        // listRequestService.customer.lastName,
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
        field: "stt",
        headerName: "STT",
        width: 100,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.stt}</div>;
        },
      },
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
      const service = listRequestService.find(
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
    if (userInfo.userRole !== USER_ROLE.HOTEL_MANAGE) {
      actionColumn = [
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
        <div className="modalRequestServiceManage">
          <h2>Dịch vụ sử dụng</h2>
          <hr />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tên dịch vụ</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Xác nhận</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
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
