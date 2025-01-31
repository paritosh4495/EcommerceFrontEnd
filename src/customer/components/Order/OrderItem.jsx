import { Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCart, removeCartItem, updateCartItem } from "../../../State/Cart/Action";
import { store } from "../../../State/store";

const OrderItem = ({item}) => {
  console.log("ITEM : Inside OrderItem : ",item)
  
  const dispatch = useDispatch();

    // Handler to remove item
//     const handleRemoveItem = () => {
//       dispatch(removeCartItem({ cartItemId: item?.id })); // 
//     };

//       // Handler to increase quantity
//   const handleIncreaseQuantity = () => {
//     dispatch(addItemToCart({ productId: item.productId, quantity: 1, size: item.size, price: item.price })); // 
//   };

//   // Handler to decrease quantity
//   const handleDecreaseQuantity = () => {
//     if (item.quantity > 1) {
//       dispatch(updateCartItem({ cartItemId: item?.id }));
//     } else {
//       handleRemoveItem(); // Remove item if quantity is 1
//     }
//   };

  

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.imageUrl}
            alt={item?.title || "Product"}
          />
        </div>
        <div className="ml-5 space-y-1 text-left ">
          <p className="font-semibold">{item?.title}</p>
          <p className="opacity-70">Size: {item?.size}, {item?.color}</p>
          <p className="opacity-70 mt-2">Seller: {item?.brand}</p>
            <div className="flex space-x-2 items-center text-gray-900 pt-6">
                    <p className="font-semibold">${item?.discountedPrice}</p>
                    <p className="line-through opacity-50">${item?.price}</p>
                    <p className="text-green-600 font-semibold">{item?.discountPercentage} % off</p>
            </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
            <div className="flex items-center space-x-2">
                {/* <IconButton onClick={handleDecreaseQuantity} >
                    <RemoveCircleOutlineIcon/>      
                </IconButton> */}
                                    <p className="opacity-70">Quantity</p>

                <span className="py-1 px-7 font-semibold">{item?.quantity}  </span>
                {/* <IconButton sx={{color:"RGB(145 85 253)"}} onClick={handleIncreaseQuantity}>
                    <AddCircleOutlineIcon/>      
                </IconButton> */}
              
            </div>
            <div>
                {/* <Button  sx={{color:"RGB(145 85 253)"}} onClick={handleRemoveItem}>
                    Remove
                </Button> */}
            </div>
        </div>
    </div>
  );
};

export default OrderItem;
