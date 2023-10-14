import axios from "axios";
import toast from "react-hot-toast";
import axiosConfig from "src/utils/axios";

export default async function apiLogin(userInfo) {
    try {
        const response = await axiosConfig.post('/api/auth/base/login', userInfo);

        // if (response.status === 200) {
        // const nextRes = await axios.post('/api/auth/token', { token: response.data.result.token })

        // console.log(nextRes)

        //     return response
        // }

        return response;
    } catch (error) {
        toast.error('خطایی رخ داد')
        throw new Error(error?.message)
    }

}