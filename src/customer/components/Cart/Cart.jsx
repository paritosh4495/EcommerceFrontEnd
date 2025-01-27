import React from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout?step=2")
  }

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {[1,1,1,1].map((item)=> <CartItem />)}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border text-left items-center p-5 shadow-lg rounded-md">
            
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <Divider /> 
            <div className="space-y-1 font-semibold mb-10 ">
                <div className="flex justify-between pt-3 text-black text-left">
                    <span>Price</span>
                    <span>$100</span>
                </div>
              
                {/* Discount */}
                <div className="flex justify-between pt-3 text-left">
                    <span>Discount</span>
                    <span className="text-green-600 ">-$30</span>
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
                    <span className="text-green-600"> $100</span>
                </div>
            </div>
            <Button onClick={handleCheckout}
                  color="secondary"
                  variant="contained"
                  fullWidth
                  sx={{ px: "2.5rem", py: "0.7rem" }}
                >
                  Checkout
                </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
