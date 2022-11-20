import "./ServiceContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../data/DataTableUser";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/actions/ModalAction";
import { serviceManageState$ } from "../../redux/selectors/ServiceManageSelector";
import * as actions from "../../redux/actions/ServiceManageAction";
const ServiceContainer = () => {
  const dispatch = useDispatch();
  const listHotelService = useSelector(serviceManageState$);

  useEffect(() => {
    dispatch(actions.getHotelService.getHotelServiceRequest());
  }, [dispatch]);

  const renderArr = () => {
    let arrNew = [];
    listHotelService.forEach((item) => {
      arrNew.push({
        id: item.id,
        name: item.name,
        type: item.serviceCategory.name,
        status: item.status,
        image: item.image.map((item) => {
          return item.pictureUrl;
        }),
      });
    });
    return arrNew;
  };
  const [data, setData] = useState(renderArr());
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  let serviceColumns = [
    {
      field: "id",
      headerName: "Mã",
      width: 100,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Tên dịch vụ",
      width: 300,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.name}</div>;
      },
    },
    {
      field: "type",
      headerName: "Loại",
      width: 200,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.type}</div>;
      },
    },

    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="img" />
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {!params.row.status ? "Đang ẩn" : "Đang hiện"}
          </div>
        );
      },
    },
  ];

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
              onClick={() => openCreateServiceModal}
            >
              Cập nhật
            </div>
            <Link to="" style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              {" "}
              Xoá
            </div>
          </div>
        );
      },
    },
  ];
  const openCreateServiceModal = useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách dịch vụ
        <a onClick={openCreateServiceModal} className="link">
          Thêm dịch vụ
        </a>
      </div>
      <DataGrid
        className="datagrid"
        rows={renderArr()}
        columns={serviceColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ServiceContainer;
