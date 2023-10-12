import { useQuery } from "@tanstack/react-query";
import { apiFetchAllActivityHistories } from "src/api/activityHistories/apiActivityHistories";

// get activity histories index
export default function useActivityIndex() {
    const { isLoading, data: activityHistories } = useQuery({
        queryKey: ['activity-histories'],
        queryFn: apiFetchAllActivityHistories,
    });

    return { isLoading, activityHistories }
}