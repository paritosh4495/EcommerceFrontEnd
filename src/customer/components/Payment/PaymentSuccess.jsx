import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { store } from "../../../State/store";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { orderId } = useParams();

  // console.log("Order ID : ",orderId);

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  console.log("Updated ORDER ::  ", order);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    setPaymentId(urlParam.get("razorpay_payment_id"));
    setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    const data = { orderId, paymentId };
    console.log("Some Data", data);
    dispatch(getOrderById(orderId));
    dispatch(updatePayment(data));
  }, [orderId, paymentId]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle className="text-left">Payment Success</AlertTitle>
          Congratulations! Your order has been placed.
        </Alert>
      </div>

      <OrderTracker activeStep={1} />

      <Grid container className="space-y-5 py-5 pt-20">
        {order.order?.data?.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 "
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {/* { order.order?.orderItems.map((item) => <Grid item xs={6}> */}
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.imageUrl}
                  alt="Sine Image"
                />

                <div className="ml-5 space-y-2 text-left">
                  <p className="font-semibold"> {item.title}</p>
                  <div className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: {item.color}</span>
                    <span>Size: {item.size} </span>
                  </div>
                  <p>Seller : {item.brand}</p>
                  <p className="font-medium">$ {item.price}</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <AddressCard address={order?.order?.data?.address} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
