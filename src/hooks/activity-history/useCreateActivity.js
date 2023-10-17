import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { apiCreateActivityHistory } from "src/api/activityHistories/apiActivityHistories";

export default function useCreateActivity(file) {
    const router = useRouter()
    const queryClient = useQueryClient();

    // mutate activity histories 
    const { mutate, isLoading } = useMutation({
        mutationFn: apiCreateActivityHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['activity-histories']
            });
            router.back();
            toast.success('با موفقیت افزوده شد');
        },
        onError: (error) => {
            console.log(error.message)
            toast.error('خطایی هنگام ایجاد رخ داد')
        }
    });

    return { mutate, isLoading }
}