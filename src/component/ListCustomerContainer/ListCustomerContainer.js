import React, { useEffect, useMemo } from "react";
import "./ListCustomerContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/DataTableNews";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/CustomerManageAction";
import { customerManageState$ } from "../../redux/selectors/CuatomerManageSelector";
import { CHECKIN, CHECKOUT } from "../../utils/constants/settingSystem";
export default function ListCustomerContainer() {
  const [data, setData] = useState(userRows);
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleCustomerDetail = (info) =>{
     dispatch(actions.getInfoCustomerByBookingId.getInfoCustomerByBookingIdRequest({booking:info}))
     navigate(`/customerManage/${info.id}`)
  }
  useEffect(() => {
    dispatch(actions.getAllPrimaryCustomer.getAllPrimaryCustomerRequest());
  }, [dispatch]);
  let listCustomer = useSelector(customerManageState$);
  const renderTypeRoom = (roomTypeId) => {
    let roomType = "";
    switch (roomTypeId) {
      case 1:
        return (roomType = "Deluxe King/ Cao cấp");
      case 2:
        return (roomType = "Deluxe Twin/ Cao cấp");
      case 3:
        return (roomType = "Superior King/ Phòng thường");
      case 4:
        return (roomType = "Superior Twin/ Phòng thường");
      case 5:
        return (roomType = "Standard King/ Phòng thường");
      case 6:
        return (roomType = "Standard Twin/ Phòng thường");
      default:
        return roomType;
    }
  };
  useEffect(() => {}, [dispatch]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const renderArr = () => {
    let arrNew = [];
    // let listRequestServiceNew = listRequestService.filter(
    //   (item) => item.status !== DONE
    // );
    listCustomer?.forEach((item, index) => {
      arrNew.push({
        stt: index + 1,
        id: item.customer.id,
        idBooking: item.booking.data.id,
        orders:item.booking.data.orders,
        name:
          item.customer.firstName +
          " " +
          item.customer.middleName +
          " " +
          item.customer.lastName,
        arrivalDate: item.booking.data.arrivalDate,
        departureDate: item.booking.data.departureDate,
        createDate: item.booking.data.createDate,
        roomType: renderTypeRoom(item.booking.data.roomTypeId),
        roomTypeId:item.booking.data.roomTypeId,
        numOfAdult:item.booking.data.numOfAdult,
        numOfChildren:item.booking.data.numOfChildren,
        status: item.booking.data.status,
      });
    });
    return arrNew;
  };
  const allCustomer = useMemo(
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
        field: "idBooking",
        headerName: "Mã Đặt Phòng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.idBooking}</div>;
        },
      },

      {
        field: "name",
        headerName: "Tên Khách",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },
      // {
      //   field: "requestService",
      //   headerName: "Dịch Vụ Đi Kèm",
      //   width: 200,
      //   renderCell: (params) => {
      //     return <div className="cellWithImg">{params.row.requestService}</div>;
      //   },
      // },
      {
        field: "arrivalDate",
        headerName: "Ngày Đến",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.arrivalDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "departureDate",
        headerName: "Ngày Đi",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.departureDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "roomType",
        headerName: "Loại Phòng",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },

      {
        field: "status",
        headerName: "Trạng Thái",
        width: 120,
        renderCell: (params) => {
          return (
            <div
              className={`cellWithImg ${
                params.row.status === CHECKIN ? "CHECKIN" : "CHECKOUT"
              }`}
            >
              {params.row.status === CHECKIN ? "Đang ở" : "Đã rời khỏi"}
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
              onClick={()=>{handleCustomerDetail(params.row)}}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem chi tiết</div>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableCustomerContainer">
      <div className="datatableTitle">Danh Sách Khách Hàng</div>
      <DataGrid
        getRowId={(row) => row.stt}
        className="datagrid"
        rows={renderArr()}
        columns={allCustomer.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
}
