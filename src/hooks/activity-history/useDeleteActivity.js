import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDeleteActivityHistory } from "src/api/activityHistories/apiActivityHistories";

export default function useDeleteActivity() {
    const queryClient = useQueryClient();

    // mutate activity histories 
    const { isLoading, mutate } = useMutation({
        mutationFn: apiDeleteActivityHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['activity-histories']
            });
            toast.success('با موفقیت حذف شد')
        },
        onError: () => toast.error('امکان حذف وجود ندارد')
    });

    return { isLoading, mutate }

}