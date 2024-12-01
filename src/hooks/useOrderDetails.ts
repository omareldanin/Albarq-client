import { getOrderDetailsService } from "@/services/getOrderDetails";
import { useQuery } from "@tanstack/react-query";

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: () => getOrderDetailsService(id),
        enabled: !!id
    });
};
