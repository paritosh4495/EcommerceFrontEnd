import { Box, Button, Divider, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/apiConfig";

const DeliveryAddressFrom = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get("api/address/get");
        setAddresses(response.data.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleSubmit = (e)=>
  {
    e.preventDefault();
    
    const data  = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };
    // some comment 
    
    const orderData = {address,navigate}
    dispatch(createOrder(orderData))
    
    console.log("address : ",address)
  }


  const handleDelivery = (address) => {
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
    console.log("Selected Address:", address);
  };



  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          item
          className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
          <>
            {addresses.map((address,index)  => (
              <Box key={address.id} mb={2}>
                <AddressCard address={address} />
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="button"
                    onClick={() => handleDelivery(address)}
                  >
                    Deliver Here
                  </Button>
                </Box>
                 {/* Add Divider except after the last address */}
              {index < addresses.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
              </Box>
            ))}
          </>
          </div>
        </Grid>

        {/* GRID -2  */}

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                {/* LAST NAME */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                {/* ADDRESS */}

                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>

                {/* CITY */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                {/* State/Province/Region */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                {/* ZIPCODE */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip /Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="end">
                    <Button
                      sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                      size="large"
                      variant="contained"
                      type="submit"
                      
                    >
                      Deliver Here
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressFrom;
