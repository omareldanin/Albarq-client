import { api } from "@/api";
import { editOrderEndpoint } from "@/api/apisUrl";
import type { orderSecondaryStatusArabicNames } from "@/lib/orderSecondaryStatusArabicNames";
import type { orderStatusArabicNames } from "@/lib/orderStatusArabicNames";

export interface EditOrderPayload {
    paidAmount?: number;
    discount?: number;
    status?: keyof typeof orderStatusArabicNames;
    deliveryAgentID?: number;
    deliveryDate?: string;
    recipientName?: string;
    recipientPhones?: string[];
    recipientAddress?: string;
    notes?: string;
    details?: string;
    repositoryID?: number;
    branchID?: number;
    clientID?: number;
    confirmed?: boolean;
    secondaryStatus?: keyof typeof orderSecondaryStatusArabicNames;
    inquiryEmployeesIDs?: number[];
    forwarded?: boolean;
    forwardedCompanyID?: number;
    processed?: boolean;
}

export const editOrderService = async ({
    data,
    id
}: {
    data: EditOrderPayload;
    id: number;
}) => {
    const response = await api.patch<EditOrderPayload>(editOrderEndpoint + id, data);
    return response.data;
};
