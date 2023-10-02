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
export async function apiCreateActivityHistory(newActivityHistory, file) {
    try {
        const formData = new FormData();
        Object.entries(newActivityHistory).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('file', file[0]);

        const response = await axiosConfig.post(`${ACTIVITY_BASE_URL}/store`, formData, {
            headers: {}
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}


// update 
export async function apiUpdateActivityHistory(updatedActivityHistory, file, id) {
    try {
        const formData = new FormData();
        Object.entries(updatedActivityHistory).forEach(([key, value]) => {
            formData.append(key, value)
        });
        formData.append('file', file[0]);
        formData.append('_method', 'put');

        const response = await axiosConfig.post(`${ACTIVITY_BASE_URL}/update/${id}`, formData, {
            headers: {}
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}


// show detail
export async function apiShowActivityHistory(id) {
    try {
        const response = await axiosConfig.get(`${ACTIVITY_BASE_URL}/show/${id}?user_id=1`);
        const data = response.data.result;

        return data;
    } catch (error) {
        throw new Error(error.message)
    }
}