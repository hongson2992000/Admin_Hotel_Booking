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
export default function NewsContainer() {
  const [data, setData] = useState(userRows);
  const listNews = useSelector(newsManageState$);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    dispatch(actions.getNews.getNewsRequest());
  }, [dispatch]);
  const renderArr = () => {
    let arrNew = [];
    listNews?.forEach((item, i) => {
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
      headerName: "Tên sự kiện",
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
      headerName: "Ngày diễn ra",
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
      headerName: "Thời gian",
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
              onClick={() => handleDelete(params.row.id)}
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
        Danh sách tin tức
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
    </div>
  );
}
