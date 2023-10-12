import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { apiUpdateActivityHistory } from "src/api/activityHistories/apiActivityHistories";

export default function useUpdateActivity(file, id) {
    const router = useRouter()
    const queryClient = useQueryClient();

    // mutate activity history
    const { isLoading, mutate } = useMutation({
        mutationFn: (updatedActivityHistory) => apiUpdateActivityHistory(updatedActivityHistory, file, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['activity-histories'],
            });
            router.back()
            toast.success('تغییر با موفقیت اعمال شد');
        },
        onError: () => toast.error('خطایی هنگام اعمال تغییر رخ داد')
    });

    return { mutate, isLoading }
}