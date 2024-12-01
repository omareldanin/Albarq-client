import { reactivateClientService } from "@/services/reactivateClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useActivateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => reactivateClientService({ id }),
        onSuccess: () => {
            toast.success("تم تفعيل العميل بنجاح");
            queryClient.invalidateQueries(["clients"]);
        }
    });
};
