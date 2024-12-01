import { api } from "@/api";
import { deleteOrderEndpoint } from "@/api/apisUrl";

export const deleteOrderService = async ({ id }: { id: number }) => {
    const response = await api.delete(deleteOrderEndpoint + id);
    return response.data;
};
