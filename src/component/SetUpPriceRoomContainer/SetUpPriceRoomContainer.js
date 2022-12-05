import React from "react";
import "./SetUpPriceRoomContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/DataTableNews";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function SetUpPriceRoomContainer() {
  const [data, setData] = useState(userRows);

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
  return (
    <div className="datatableSetUpPriceRoomContainer">
      <div className="datatableTitle">
        Cấu hình giá
      </div>
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
