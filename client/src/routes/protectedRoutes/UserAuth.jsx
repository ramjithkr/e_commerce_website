
import { useEffect } from 'react';
import { axiosInstance } from './../../config/axiosInstance';

export const UserAuth = ({children}) => {

    const CheckUser = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/check-user",
                method: "GET",
                withCredentials: true,
            });
            console.log(response,"=====response");
            return response?.data;
        } catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{
    CheckUser();
},[])

  return children
}


//1:43
