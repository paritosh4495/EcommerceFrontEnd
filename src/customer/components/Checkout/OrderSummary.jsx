import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button, Divider } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { store } from '../../../State/store'
import OrderItem from '../Order/OrderItem'
import { createPayment } from '../../../State/Payment/Action'



const OrderSummary = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const {order} = useSelector(store => store);
  console.log("Order INSIDE ORDER SUMMARY : ",order);

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  useEffect(()=>{
    dispatch(getOrderById(orderId))
  },[orderId])


  const handleCheckout = () =>{
    dispatch(createPayment(orderId));
  }


  return (
    <div>
        <div className='p-5 shadow-lg rounded-s-md border'>
            <AddressCard address={order.order?.data?.address}/>
        </div>
        <div>
      <div className="lg:grid grid-cols-3 relative">
        <div className="col-span-2">
          {order.order?.data?.orderItems.map((item)=> <OrderItem  item={item}/>)}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border text-left items-center p-5 shadow-lg rounded-md">
            
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <Divider /> 
            <div className="space-y-1 font-semibold mb-10 ">
                <div className="flex justify-between pt-3 text-black text-left">
                    <span>Price</span>
                    <span>${order.order?.data?.totalPrice}</span>
                </div>
              
                {/* Discount */}
                <div className="flex justify-between pt-3 text-left">
                    <span>Discount</span>
                    <span className="text-green-600 ">-${order.order?.data?.discount}</span>
                </div>
                {/* DELIVERY CHARGE */}
                <div className="flex justify-between pt-3  text-left">
                    <span>Delivery Charge</span>
                    <span className="text-green-600">Free</span>
                </div>
                <hr />
                {/* SOMETHING */}
                <div className="flex justify-between pt-3 text-left  font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600"> ${order.order?.data?.totalDiscountedPrice}</span>
                </div>
            </div>
            <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  sx={{ px: "2.5rem", py: "0.7rem" }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OrderSummary