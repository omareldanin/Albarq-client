import { getOrderReceipt } from "@/services/getOrderReceipt";
import { useMutation } from "@tanstack/react-query";

export const useOrderReceipt = (name: string) => {
    return useMutation({
        mutationFn: (id: number[]) => getOrderReceipt(id, name)
    });
};
