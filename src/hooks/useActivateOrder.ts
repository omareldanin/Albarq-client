import { activateOrderService } from "@/services/activateOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useActivateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => activateOrderService({ id }),
        onSuccess: () => {
            toast.success("تم استرجاع الطلب بنجاح");
            queryClient.invalidateQueries(["orders"]);
        }
    });
};
