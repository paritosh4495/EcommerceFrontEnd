import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {

  const navigate = useNavigate();


  return (
    <div onClick={()=> navigate(`/account/order/${5}`)} className="p-5 shadow-lg  hover:shadow-2xl border">
      {/* Parent GRID  */}

      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        {/* GRID - A */}

        <Grid item xs={6}>
          <div className="flex cursor-pointer text-left">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://images.pexels.com/photos/2343661/pexels-photo-2343661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Some Pants"
            />
            <div className="ml-5 space-y-2">
              <p className="">Men Slim Mid Raise Black Jeans</p>
              <p className="opacity-50 text-xs font-semibold">Size: M</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>

        {/* GRID - B */}

        <Grid item xs={2}>
          <p>$1099</p>
        </Grid>

        {/* GRID - C */}

        <Grid item xs={4}>
          {true && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>Delivered on 3 March</span>
                
              </p>
              <p className="text-xs">
                Your Item has been Delivered
              </p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected Delivery on March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
