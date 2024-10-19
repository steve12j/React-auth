import { useAuth } from "./useAuth";
import axiosInstance from "../api/axios";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosInstance.get('/refresh', {
                withCredentials: true
            })
            setAuth(prev => {
                return {
                    ...prev,
                    accessToken: response?.data?.accessToken
                }
            })

            return response?.data?.accessToken;

        } catch (error) {
            console.log(error, 'Refresh Error')
        }
    }

    return refresh;

}

export default useRefreshToken;