import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

function Orders() {

  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.orders); // Assuming you have an 'orders' slice
  const login = useSelector((state) => state.signUp);
  const user = login.user
  const navigate = useNavigate()

  const columns = [
    { field: 'id', headerName: 'Order Id', minWidth: 300, },
    // { field: 'OrderItem', headerName: 'Order Item', minWidth: 150, },
    // { field: 'status', headerName: 'Status', minWidth: 150,cellClassName:(params)=>`${params.getValue(params.id,"status")?"Pending"==="text-green-600":"text-red-700"}` },
    { field: 'status', headerName: 'Status', minWidth: 150, },
    { field: 'itemsQty', headerName: 'Items Qty', type: 'number', minWidth: 150 },
    { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 150 },
    { field: "OrderDate", headerName: "Order Date", type: "date", minWidth: 200 },
    // { field: "actions", headerName: "Actions", type: "number", minWidth: 150, }    
    /*
    {
      field: "actions", headerName: "Actions", type: "number", minWidth: 150,
      renderCell: (params) => {
        return (

          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        )
      }
    }
    */
  ];

  let rows = [];

  {
    orders &&
      Array.from(orders).forEach((item, index) => {
        const check = item.items[0]
        console.log()
        rows.push({
          id: item._id,
          // OrderItem: item.items[0].name,
          status: item.status,
          itemsQty: item.totalItems,
          amount: item.totalPrice,
          OrderDate: new Date(item.orderDate)
        })
      })
    // console.log(rows)
  }


  // console.log("Orders in orders")
  // console.log(orders)

  useEffect(()=>
  {
    if(!login.isLogin)
      navigate("/Login")
  },[])

  return (
    <div className='mt-[5%]'>
      <div className='bg-red-900 h-12 flex items-center justify-center'>
        <h1 className=' fonr-simpleTwos font-bold text-white tet-3xl'>{`${user.userName.toUpperCase()} - Orders`}</h1>
      </div>

      {
        orders &&
        <DataGrid rows={rows} columns={columns} />
      }
    </div>
  );
}

export default Orders;
