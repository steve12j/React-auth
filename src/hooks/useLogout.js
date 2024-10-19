import React from 'react'
import axiosInstance from '../api/axios'
import { useAuth } from './useAuth'

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            await axiosInstance.get('/logout', {
                withCredentials: true
            })
            setAuth({})
        } catch (error) {
            console.error(error, 'Logout Error');
        }
    }

    return logout;


}

export default useLogout;