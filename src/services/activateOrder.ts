import { api } from "@/api";
import { deleteOrderEndpoint } from "@/api/apisUrl";

export const activateOrderService = async ({ id }: { id: number }) => {
    const response = await api.patch(`${deleteOrderEndpoint + id}/reactivate`);
    return response.data;
};
