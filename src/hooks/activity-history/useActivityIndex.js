import { useQuery } from "@tanstack/react-query";
import { apiFetchAllActivityHistories } from "src/api/activityHistories/apiActivityHistories";

// get activity histories index
export default function useActivityIndex(initialData) {
    const { isLoading, data } = useQuery({
        queryKey: ['activity-histories'],
        queryFn: apiFetchAllActivityHistories,
        initialData: initialData
    });

    return { isLoading, data }
}