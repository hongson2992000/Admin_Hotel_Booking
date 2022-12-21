import React, { useCallback, useEffect } from "react";
import "./NewsContainer.scss";
import * as actions from "../../redux/actions/NewsManageAction";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/DataTableNews";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getImageUrlByType from "../../utils/constants/GetImageUrlByType";
import { newsManageState$ } from "../../redux/selectors/NewsManageSelector";
import {
  showModalAddNews,
  showModalUpdateNews,
} from "../../redux/actions/ModalAction";
import DialogDelete from "../DialogDelete/DialogDelete";
export default function NewsContainer() {
  const [data, setData] = useState(userRows);
  const listNews = useSelector(newsManageState$);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNews.getNewsRequest());
  }, [dispatch]);
  const renderArr = () => {
    let arrNew = [];
    let list = listNews.filter((item)=>item.status !== false)
    list?.forEach((item, i) => {
      arrNew.push({
        stt: i + 1,
        id: item.id,
        name: item.newName,
        startDate: item.startDate,
        endDate: item.endDate,
        startTime: item.startTime,
        endTime: item.endTime,
        status: item.status,
        image: getImageUrlByType(`img_new_${item.id}`)?.pictureUrl,
      });
    });
    return arrNew;
  };
  const handleAddNews = useCallback(() => {
    dispatch(showModalAddNews());
  }, [dispatch]);
  const handleUpdateNews = useCallback(
    (id) => {
      let newsItem = listNews.find((item) => item.id === id);
      dispatch(actions.filInfoNews.filInfoNewsRequest(newsItem));
      dispatch(showModalUpdateNews());
    },
    [dispatch, listNews]
  );
   //Handle Dialog
   const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [idBooking, setIdBooking] = useState({
    id: 0,
  });
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const handleDeleteNews = useCallback((id) => {
    handleDialog("Bạn chắc chắn muốn xóa ?", true);
    setIdBooking({
      id: id,
    });
  }, []);
  const areUSureCheckOut = (choose) => {
    if (choose) {
      dispatch(
        actions.deleteNews.deleteNewsRequest({
          id: idBooking.id,
          // navigate: navigate,
        })
      );
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const newColumns = [
    {
      field: "stt",
      headerName: "STT",
      width: 100,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.stt}</div>;
      },
    },
    {
      field: "name",
      headerName: "Tên Sự Kiện",
      width: 400,
      renderCell: (params) => {
        return <div className="cellWithImg">{params.row.name}</div>;
      },
    },

    {
      field: "img",
      headerName: "Hình Ảnh",
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
      field: "startDate",
      headerName: "Ngày Diễn Ra",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.startDate + "-" + params.row.endDate}
          </div>
        );
      },
    },
    {
      field: "startTime",
      headerName: "Thời Gian",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.startTime + "-" + params.row.endTime}
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
            <div
              className="updateButton"
              onClick={() => handleUpdateNews(params.row.id)}
            >
              Cập nhật
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDeleteNews(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableNewsContainer">
      <div className="datatableTitle">
        Danh Sách Tin Tức
        <span
          className="link"
          onClick={() => {
            handleAddNews();
          }}
        >
          Thêm Tin Tức
        </span>
      </div>
      <DataGrid
        className="datagrid"
        rows={renderArr()}
        columns={newColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureCheckOut} message={dialog.message} />
      )}
    </div>
  );
}
