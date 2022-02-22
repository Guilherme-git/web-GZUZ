import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/index';

export const createNewOrder = createAsyncThunk('create/order', async (payload) => {
    return payload;
})

const initialState = {
    status: 'idle',
    authenticated: false,
    ErrorAuth: '',
    pathActive: "/home/user/ordem/create",
    orders: [],
    pickupDetails: {
        enable: true,
        data: {}
    },
    deliveryDetails: {
        enable: false,
        data: {}
    },
    orderDetails: {
        enable: false,
        data: {}
    },
    confirmation: {
        enable: false
    },
    orderListed: {},
    statusOrderListed: 'idle'
};

export const CreateSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setPath: (state, action) => {
            state.pathActive = action.payload
        },
        setPickupDetails: (state, action) => {
            state.deliveryDetails.enable = true
            state.pickupDetails.data = action.payload;
            state.pathActive = '/home/user/ordem/create/delivery-details'
        },
        setDeliveryDetails: (state, action) => {
            state.orderDetails.enable = true
            state.deliveryDetails.data = action.payload
            state.pathActive = "/home/user/ordem/create/ordem-details";
        },
        setOrderDetails: (state, action) => {
            state.confirmation.enable = true
            state.confirmation.data = action.payload
            state.pathActive = "/home/user/ordem/create/confirmation";
        },
        resetReducer: (state) => {
            state.status = 'idle';
            state.deliveryDetails.enable = false
            state.orderDetails.enable = false;
            state.confirmation.enable = false
            state.pickupDetails.data = {};
            state.deliveryDetails.data = {};
            state.orderDetails.data = {};
        },
        listOrder: (state, action) => {
            const { id } = action.payload;
            state.statusOrderListed = 'loading';
            const index = state.orders?.findIndex((item) => item.id.toString() === id.toString());
      
            if (index !== -1) {
              state.orderListed = state.orders[index];
              state.statusOrderListed = 'success';
            } else {
              state.statusOrderListed = 'failed';
            }
          }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(createNewOrder.fulfilled, (state, action) => {
            state.status = 'success';
            // state.user = action.payload
            console.log(action.payload)
        });
        builder.addCase(createNewOrder.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});

export const { setPath, setPickupDetails, setDeliveryDetails, setOrderDetails, resetReducer, listOrder,statusOrderListed, orderListed } = CreateSlice.actions;

export default CreateSlice.reducer;