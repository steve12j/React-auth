import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { jwtDecode } from 'jwt-decode'

const RequireAuth = ({ allowedRoles, children }) => {
    const { auth } = useAuth();
    const location = useLocation();



    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const roles = decoded?.userInfo?.roles || [];


    return (
        roles.find((role) => allowedRoles?.includes(role))
            ?
            children
            :
            auth?.accessToken
                ?
                <Navigate to='../unauthorized' replace />
                : <Navigate to='../login' state={{ from: location }} replace />
    )
}

export default RequireAuth;