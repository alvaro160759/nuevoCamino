import { useState } from "react";
import { axiosBase } from "../api/fetch";

const BASE_URL = import.meta.env.VITE_URL;

export const logIn = async ({data} ) => {

    const res = await axiosBase.post('/login',data);
    return res.data;
};
