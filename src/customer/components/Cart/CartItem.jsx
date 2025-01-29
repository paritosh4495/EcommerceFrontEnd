import { Button, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = ({item}) => {
  console.log("ITEM : Inside CartItem : ",item)
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.imageUrl}
            alt="Pants"
          />
        </div>
        <div className="ml-5 space-y-1 text-left ">
          <p className="font-semibold">{item?.title}</p>
          <p className="opacity-70">Size: {item?.size}, {item?.color}</p>
          <p className="opacity-70 mt-2">Seller: {item.brand}</p>
            <div className="flex space-x-2 items-center text-gray-900 pt-6">
                    <p className="font-semibold">${item.price}</p>
                    <p className="line-through opacity-50">${item.discountedPrice}</p>
                    <p className="text-green-600 font-semibold">{item.discountPercentage} % off</p>
            </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
            <div className="flex items-center space-x-2">
                <IconButton >
                    <RemoveCircleOutlineIcon/>      
                </IconButton>
                <span className="py-1 px-7 border rounded-sm">{item.quantity}  </span>
                <IconButton sx={{color:"RGB(145 85 253)"}}>
                    <AddCircleOutlineIcon/>      
                </IconButton>
              
            </div>
            <div>
                <Button  sx={{color:"RGB(145 85 253)"}}>
                    Remove
                </Button>
            </div>
        </div>
    </div>
  );
};

export default CartItem;
