import React, { useEffect, useMemo } from "react";
import "./ListBookingContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { userColumns, userRows } from "../../data/DataTableBooking";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingManageState$ } from "../../redux/selectors/BookingManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import moment from "moment";
export default function ListBookingContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllBooking.getAllBookingRequest());
  }, [dispatch]);
  const [data, setData] = useState(userRows);
  const [value, setValue] = React.useState("1");

  const listBooking = useSelector(bookingManageState$);

  const handleChange = (e, val) => {
    setValue(val);
  };
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const renderTypeRoom = (roomTypeId) => {
    let roomType = "";
    switch (roomTypeId) {
      case 1:
        return (roomType = "Standard Room");
      case 2:
        return (roomType = "Superior Room");
      case 3:
        return (roomType = "Deluxe Room");
      default:
        return roomType;
    }
  };
  const renderArr = () => {
    let arrNew = [];
    listBooking.forEach((item) => {
      arrNew.push({
        id: item.id,
        name:
          item.customer?.firstName +
          " " +
          item.customer?.middleName +
          " " +
          item.customer?.lastName,
        roomType: renderTypeRoom(item.roomTypeId),
        requestService: "Đưa Đón Sân Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
      });
    });
    return arrNew;
  };
  const renderArrByDate = () => {
    let currentDate = moment().format("DD/MM/YYYY");
    //parser string to date to compare
    // console.log("Date",date);
    // console.log("Check Af9ter", moment().isAfter(date));
    // console.log("Check Before", moment().isBefore(date));
    // let displayDate =
    //   showDate.getDate() +
    //   "/" +
    //   (showDate.getMonth() + 1) +
    //   "/" +
    //   showDate.getFullYear();
    let arrivalDate = new Date("24/11/2022").getTime();
    let currrDate = new Date(currentDate.toString()).getTime();
    console.log("arrivalDate",arrivalDate)
    console.log("currrDate",currrDate)
    if (arrivalDate === currrDate) {
      return true;
    }
    // listBooking.forEach((item) => {
    //   let sub = item.arrivalDate;
    //   let nDate = sub.substring(0,10);
      
    //   // let currDate = new Date(currentDate.toString()).getTime()
    //   console.log("DateTime", currentDate);
    //   console.log("DateE", arrivalDate);
      
    // });
    return false;
  };
  console.log("Thanh An", renderArrByDate());
  const allBooking = useMemo(
    () => [
      {
        field: "id",
        headerName: "Mã Đặt Phòng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "Tên Khách Đặt",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Loại Phòng",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      {
        field: "requestService",
        headerName: "Dịch Vụ Đi Kèm",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.requestService}</div>;
        },
      },
      {
        field: "arrivalDate",
        headerName: "Ngày Đến",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.arrivalDate}</div>;
        },
      },
      {
        field: "departureDate",
        headerName: "Ngày Đi",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.departureDate}</div>;
        },
      },
    ],
    []
  );
  const bookingArriveInDay = useMemo(
    () => [
      { field: "id", headerName: "Mã Đặt Phòng", width: 200 },
      {
        field: "username",
        headerName: "Tên Khách Đặt",
        width: 300,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        },
      },

      {
        field: "img",
        headerName: "Loại Phòng",
        width: 250,
      },
      {
        field: "status",
        headerName: "Dịch Vụ Đi Kèm",
        width: 250,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        },
      },
      {
        field: "status",
        headerName: "Ngày Đến",
        width: 250,
        // renderCell: (params) => {
        //   return (
        //     <div className={`cellWithStatus ${params.row.status}`}>
        //       {params.row.status}
        //     </div>
        //   );
        // },
      },
      {
        field: "status",
        headerName: "Ngày Đi",
        width: 250,
        // renderCell: (params) => {
        //   return (
        //     <div className={`cellWithStatus ${params.row.status}`}>
        //       {params.row.status}
        //     </div>
        //   );
        // },
      },
    ],
    []
  );
  const bookingLeaveInDay = useMemo(
    () => [
      { field: "id", headerName: "Mã Đặt Phòng", width: 200 },
      {
        field: "username",
        headerName: "Tên Khách Đặt",
        width: 300,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        },
      },

      {
        field: "img",
        headerName: "Loại Phòng",
        width: 250,
      },
      {
        field: "status",
        headerName: "Status",
        width: 250,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
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
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  // const updateIndexTable = (indexTable) => {
  //   if (indexTable === 1) {
  //     setIndexTable(1);
  //   } else if (indexTable === 2) {
  //     setIndexTable(2);
  //   } else {
  //     setIndexTable(3);
  //   }
  // };
  // const renderInfoTable = () => {
  //   if (indexTable === 1) {
  //     return (
  //       <DataGrid
  //         className="datagrid"
  //         rows={data}
  //         columns={bookingArriveInDay.concat(actionColumn)}
  //         pageSize={9}
  //         rowsPerPageOptions={[9]}
  //         checkboxSelection
  //       />
  //     );
  //   } else if (indexTable === 2) {
  //     return (
  //       <DataGrid
  //         className="datagrid"
  //         rows={data}
  //         columns={bookingArriveInDay.concat(actionColumn)}
  //         pageSize={9}
  //         rowsPerPageOptions={[9]}
  //         checkboxSelection
  //       />
  //     );
  //   } else {
  //     return (
  //       <DataGrid
  //         className="datagrid"
  //         rows={data}
  //         columns={bookingLeaveInDay.concat(actionColumn)}
  //         pageSize={9}
  //         rowsPerPageOptions={[9]}
  //         checkboxSelection
  //       />
  //     );
  //   }
  // };

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách Booking</div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất Cả" value="1" />
            <Tab label="Đến Trong Ngày" value="2" />
            <Tab label="Đi Trong Ngày" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DataGrid
            className="datagrid"
            rows={renderArr()}
            columns={allBooking}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </TabPanel>
        <TabPanel value="2">
          <DataGrid
            className="datagrid"
            rows={data}
            columns={bookingArriveInDay.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </TabPanel>
        <TabPanel value="3">
          <DataGrid
            className="datagrid"
            rows={data}
            columns={bookingLeaveInDay.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}
