import { useEffect, useRef, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useAuth } from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();
    const effectRan = useRef(false);

    useEffect(() => {

        if (effectRan.current === false) {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (error) {
                    console.error(error);
                } finally {
                     setIsLoading(false)
                }
            }

            !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

            return () => {
                effectRan.current = true
            }
        }

    }, [isLoading])

    return (
        <>
            {!persist ?
                <Outlet /> :
                isLoading ?
                    <p>Loading...</p>
                    : <Outlet />}
        </>
    )
}

export default PersistLogin