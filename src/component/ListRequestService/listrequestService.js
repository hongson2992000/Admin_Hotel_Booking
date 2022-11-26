import { DataGrid } from "@mui/x-data-grid";

import { useCallback, useMemo } from "react";
import "./listrequestService.scss";
import { showModal, } from "../../redux/actions/ModalAction";
import { useDispatch } from "react-redux";
function fillData(id, name, quantity, price, totalPrice, date, customer, status,) {
    return { id, name, quantity, price, totalPrice, date, customer, status, };
}
// const listrequestService = useSelector();


const renderArr = () => {
    // let arrNew = [];
    // listHotelService.forEach((item) => {
    //     arrNew.push({
    //         id: item.id,
    //         name: item.name,
    //         type: item.serviceCategory.name,
    //         status: item.status,
    //         image: item.image.map((item) => {
    //             return item.pictureUrl;
    //         }),
    //     });
    // });
    // return arrNew;
    const row = [
        fillData(1, "Mì ý sốt bò bầm", 1, 1000000, 10000, "26/11/2022", "Cusname", "BOOKED"),
        fillData(2, "Cơm", 2, 1000000, 20000, "26/11/2022", "Cusname", "PROCESSING"),
        fillData(3, "Cơm", 2, 1000000, 20000, "26/11/2022", "Cusname", "DONE"),
        fillData(4, "Cơm", 2, 1000000, 20000, "26/11/2022", "Cusname", "BOOKED"),
    ];
    // console.log(row);
    return row;
};

function ListRequestService() {
    const dispatch = useDispatch();
    const openRequestServiceModal = useCallback(

        (id) => {
            // const service = listHotelService.find(
            //     (serviceItem) => serviceItem.id === id
            // );
            // let newService = Object.assign({}, service, {
            //     serviceCategory_Id: service.serviceCategory.id,
            // });
            // dispatch(
            //     actions.filInfoHotelService.filInfoHotelServiceRequest(newService)
            // );
            dispatch(showModal());
        },
        [dispatch]
    );
    let requestColumns = useMemo(
        () => [
            {
                field: "id",
                headerName: "Mã",
                width: 10,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.id}</div>;
                },
            },
            {
                field: "name",
                headerName: "Tên dịch vụ",
                width: 200,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.name}</div>;
                },
            },
            {
                field: "quantity",
                headerName: "Số lượng",
                width: 100,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.quantity}</div>;
                },
            },

            {
                field: "price",
                headerName: "Đơn giá",
                width: 150,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.price}</div>;
                },
            },
            {
                field: "totalPrice",
                headerName: "Thành tiền",
                width: 150,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.totalPrice}</div>;
                },
            },
            {
                field: "date",
                headerName: "Ngày đặt",
                width: 180,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.date}</div>;
                },
            },
            {
                field: "customer",
                headerName: "Tên khách",
                width: 170,
                renderCell: (params) => {
                    return <div className="cellWithImg">{params.row.customer}</div>;
                },
            },
            {
                field: "status",
                headerName: "Trạng thái",
                width: 150,
                renderCell: (params) => {
                    return <div className={`cellWithStatus ${params.row.status}`}>
                        {
                            params.row.status === "BOOKED" ? "Chờ xử lý" :
                                params.row.status === "PROCESSING" ? "Đang xử lý" : "Hoàn tất"
                        }
                    </div>
                },
            },
        ],
        []
    );
    const actionColumn = [
        {
            field: "action",
            headerName: "Chức năng",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className=""
                            onClick={() => openRequestServiceModal(params.row.id)}>
                            Xem
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <>

            <div style={{ display: 'flex', height: '50%', padding: '60px 20px' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        className="datagrid"
                        rows={renderArr()}
                        columns={requestColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                </div>
            </div>

        </>
    )
}

export default ListRequestService