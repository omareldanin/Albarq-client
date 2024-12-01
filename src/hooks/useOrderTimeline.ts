import { getOrderTimeline } from "@/services/getOrderTimeline";
import { useQuery } from "@tanstack/react-query";

export const useOrderTimeline = (id: number) => {
    return useQuery({
        queryKey: ["orderTimeline", id],
        queryFn: () => getOrderTimeline(id)
    });
};
