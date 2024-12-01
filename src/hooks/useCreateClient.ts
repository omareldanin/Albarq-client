import type { APIError } from "@/models";
import { createClientsService } from "@/services/createClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => {
            return createClientsService(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["clients"]
            });
            toast.success("تم اضافة العميل بنجاح");
        },
        onError: (error: AxiosError<APIError>) => {
            toast.error(error.response?.data.message || "حدث خطأ ما");
        }
    });
};
