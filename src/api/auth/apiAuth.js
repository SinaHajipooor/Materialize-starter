import toast from "react-hot-toast";
import axiosConfig from "src/utils/axios";

export default async function apiLogin(userInfo) {
    try {
        const response = await axiosConfig.post('/api/auth/base/login', userInfo);

        return response;
    } catch (error) {
        toast.error('خطایی رخ داد')
        throw new Error(error?.message)
    }

}