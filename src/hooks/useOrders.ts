import { type OrdersFilter, getOrdersService } from "@/services/getOrders";
import { useQuery } from "@tanstack/react-query";

export const useOrders = (filter: OrdersFilter = { page: 1, size: 10 }, enabled = true) => {
    return useQuery({
        queryKey: [
            "orders",
            {
                page: filter.page || 1,
                size: 10,
                ...filter
            }
        ],
        queryFn: () =>
            getOrdersService({
                page: filter.page || 1,
                size: filter.size || 10,
                ...filter
            }),
        enabled
    });
};
