import { api } from "@/api";
import { editOrderEndpoint } from "@/api/apisUrl";

export interface RepositoryConfirmOrderByReceiptNumberPayload {
    repositoryID: number;
}

export const repositoryConfirmOrderByReceiptNumberService = async ({
    receiptNumber,
    data
}: {
    receiptNumber: number;
    data: RepositoryConfirmOrderByReceiptNumberPayload;
}) => {
    const response = await api.patch<RepositoryConfirmOrderByReceiptNumberPayload>(
        `${editOrderEndpoint}repository-confirm-order-by-receipt-number/${receiptNumber}`,
        data
    );
    return response.data;
};
