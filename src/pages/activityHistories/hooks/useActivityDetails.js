import { useQuery } from "@tanstack/react-query";
import { apiShowActivityHistory } from "src/api/activityHistories/apiActivityHistories";

// send activity id and get the activity details
export default function useActivityDetails(id) {
    const { data: activityHistory, isLoading } = useQuery({
        queryKey: ['activity-history', id],
        queryFn: () => apiShowActivityHistory(id)
    });

    return { activityHistory, isLoading }
}