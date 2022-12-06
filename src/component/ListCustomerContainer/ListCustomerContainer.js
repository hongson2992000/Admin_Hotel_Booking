import React from "react";
import "./ListCustomerContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/DataTableNews";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
export default function ListCustomerContainer() {
  const [data, setData] = useState(userRows);
  const params = useParams()
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Hành Động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/listCustomer/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem chi tiết</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableCustomerContainer">
      <div className="datatableTitle">Danh sách khách hàng</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
}
