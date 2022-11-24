import React, { useMemo } from "react";
import "./ListBookingContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/DataTableBooking";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function ListBookingContainer() {
  const [data, setData] = useState(userRows);
  const [indexTable, setIndexTable] = useState(1);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const allBooking = useMemo(() => [
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
      headerName: "Ngày Đi",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ],[]);
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
  const bookingLeaveInDay = [
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
  ];
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
  const updateIndexTable = (indexTable) => {
    if (indexTable === 1) {
      setIndexTable(1);
    } else if (indexTable === 2) {
      setIndexTable(2);
    } else {
      setIndexTable(3);
    }
  };
  const renderInfoTable = () => {
    if (indexTable === 1) {
      return (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={allBooking}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      );
    } else if (indexTable === 2) {
      return (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={bookingArriveInDay.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      );
    } else {
      return (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={bookingLeaveInDay.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      );
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách tin tức
        <Link to="/users/new" className="link">
          Thêm Tin Tức
        </Link>
      </div>
      <div className="fillter">
        <div className="fillterItem">
          <a href="#" onClick={() => updateIndexTable(1)}>
            Tất Cả
          </a>
        </div>
        <div className="fillterItem">
          <a href="#" onClick={() => updateIndexTable(2)}>
            Đến Trong Ngày
          </a>
        </div>
        <div className="fillterItem">
          <a href="#" onClick={() => updateIndexTable(3)}>
            Đi Trong Ngày
          </a>
        </div>
      </div>
      {renderInfoTable()}
    </div>
  );
}
