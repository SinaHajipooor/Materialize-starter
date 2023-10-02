import axiosConfig from "src/utils/axios";

const ACTIVITY_BASE_URL = '/api/profile/activity-history'


// index
export async function apiFetchAllActivityHistories() {
    try {
        const response = await axiosConfig.get(`${ACTIVITY_BASE_URL}?user_id=1`);
        const data = response.data.result.data;

        return data;
    } catch (error) {
        throw new Error(error.message)
    }
}


// delete 
export async function apiDeleteActivityHistory(id) {
    try {
        const response = await axiosConfig.delete(`${ACTIVITY_BASE_URL}/destroy/${id}`);

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}


// create 
// export async function apiCreateActivityHistory(newActivityHistory , file){
//     try {
//         const form
//     } catch (error) {
        
//     }
// }