import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,

} from 'react-router-dom'
import { useSelector } from "react-redux";

import { Main } from "../pages/main";
import Login from "../pages/login";
import HomeUser from './../pages/user/index'
import CreateOrder from "../pages/user/order";
import ViewOrder from "../pages/user/order/view-order";
import Register from "../pages/register";
import RegisterUser from "../pages/register/register-user";
import RegisterDriver from "../pages/register/register-driver";

import HomeDriver from './../pages/driver'
import DeliveryDetails from '../pages/driver/delivery-details'



export function RoutesMain() {
    const resultRedux = useSelector(function (state) {
        return state.login
    })

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/user" element={<RegisterUser />} />
                    
                    <Route path="/register/driver" element={<RegisterDriver />} />

                    {resultRedux.user.type == 'user' &&
                        <>
                            <Route path="/home/user" element={<HomeUser />} />
                            <Route path="/home/user/ordem/create" element={<CreateOrder />} />
                            <Route path="/home/user/ordem/view/:id" element={<ViewOrder />} />
                        </>
                    }

                    <Route path="/home/driver" element={<HomeDriver />} />
                    <Route path="/home/driver/delivery-details/:id" element={<DeliveryDetails />} />
                </Routes>
            </BrowserRouter>

        </>

    );
}