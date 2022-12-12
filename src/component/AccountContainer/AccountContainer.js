import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  showCreateAccountModel,
  showUpdateAccountModel,
} from "../../redux/actions/ModalAction";
import { accountManageState$ } from "../../redux/selectors/AccountManageSelector";
import DialogDelete from "../DialogDelete/DialogDelete";
import "./AccountContainer.scss";
import * as actions from "../../redux/actions/AccountManageAction";
const AccountContainer = () => {
  const dispatch = useDispatch();
  const listAccount = useSelector(accountManageState$);
  const handleOpenCreateModel = useCallback(() => {
    dispatch(showCreateAccountModel());
  }, [dispatch]);

  const renderArr = () => {
    let arrNew = [];
    listAccount.forEach((item, i) => {
      arrNew.push({
        stt: i + 1,
        id: item?.id,
        username: item?.username,
        name: item?.firstName + item?.middleName + item?.lastName,
        userRole: item?.userRole,
        phoneNumber: item?.phoneNumber,
        status: item?.status,
        dateOfBirth: item?.dateOfBirth,
        gender: item?.gender,
        // image: getImageUrlByType(`img_abstraction_${item.id}`)?.pictureUrl,
      });
    });
    return arrNew;
  };

  //Handle Dialog
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  // const [idService, setIdService] = useState({
  //   id: 0,
  // });
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  // const handleDelete = (id) => {
  //   handleDialog("Bạn chắc chắn xóa dịch vụ này?", true);
  //   setIdService({
  //     id: id,
  //   });
  // };
  const areUSureDelete = (choose) => {
    if (choose) {
      // dispatch(
      //   actions.deleteHotelService.deleteHotelServiceRequest(idService.id)
      // );
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const handleUpdateAccount = useCallback(
    (id) => {
      let accountItem = listAccount.find((item) => item.id === id);
      dispatch(actions.filInfoAccount.filInfoAccountRequest(accountItem));
      dispatch(showUpdateAccountModel());
    },
    [dispatch, listAccount]
  );
  const actionColumn = [
    {
      field: "action",
      headerName: "Chức năng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => handleUpdateAccount(params.row.id)}
            >
              Cập nhật
            </div>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Xoá
            </div>
          </div>
        );
      },
    },
  ];

  // Render Data of table
  let serviceColumns = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 50,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.stt}</div>;
        },
      },
      {
        field: "username",
        headerName: "Tài Khoản",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.username}</div>;
        },
      },
      {
        field: "name",
        headerName: "Họ và tên",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "gender",
        headerName: "Giới Tính",
        width: 100,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.gender ? "Nam" : "Nữ"}
            </div>
          );
        },
      },
      {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.phoneNumber}</div>;
        },
      },
      {
        field: "dateOfBirth",
        headerName: "Ngày Sinh",
        width: 130,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.dateOfBirth}</div>;
        },
      },
      {
        field: "userRole",
        headerName: "Quyền Hạn",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.userRole}</div>;
        },
      },
      {
        field: "isActive",
        headerName: "Trạng thái",
        width: 150,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.isActive}`}>
              {params.row.isActive ? "Đang hiện" : "Đang ẩn"}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="datatableAccount">
      <div className="datatableTitle">
        Danh sách Tài Khoản
        <div onClick={handleOpenCreateModel} className="link">
          Thêm Tài Khoản
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={renderArr()}
        columns={serviceColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureDelete} message={dialog.message} />
      )}
    </div>
  );
};

export default AccountContainer;
