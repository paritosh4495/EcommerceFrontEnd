import { Grid } from '@mui/material'
import React from 'react'
import OrderCard from './OrderCard'

const orderStatus = [

    {lable: "On The Way", value: "on_the_way"},
    {lable: "Delivered", value: "delivered"},
    {lable: "Cancelled", value: "cancelled"},
    {lable: "Returned", value: "returned"},
]

const Order = () => {
  return (
    <div className='px:5 lg:px-20'>
        
        <Grid container spacing={0} sx={{justifyContent:"space-between"}}>

            {/* GRID - 1  */}
            <Grid item xs={2.5}>
                
                <div className='h-auto shadow-lg bg-white p-5 sticky top-5 text-left'>

                    <h1 className='font-bold text-lg'>Filter</h1>

                    <div className='space-y-4 mt-10'>
                        
                        <h1 className='font-semibold'>ORDER STATUS</h1>
                        
                       {orderStatus.map((option) =>  <div className='flex items-center'>
                            <input defaultValue={option.value} type="checkbox" className='h-4 w-4 border-gray-300 text-inidigo-600 focus:ring-indigo-500' />
                            <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                                {option.lable}
                            </label>
                        </div>)}

                    </div>


                </div>


            </Grid>


            {/* GRID - 2  */}
            <Grid item xs={9}>
                <div className='space-y-5'>
                {
                    [1,1,1,1,1,1].map((item)=>  <OrderCard/>)
                }
                </div>

              
               

            </Grid>

        </Grid>

    </div>
  )
}

export default Order