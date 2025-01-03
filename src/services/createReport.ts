/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/api";
import { createReportEndpoint } from "@/api/apisUrl";
import type { governorateArabicNames } from "@/lib/governorateArabicNames ";
import { reduceUnusedReportsFilters } from "@/lib/reduceUnusedReportsFilters";
import type { reportTypeArabicNames } from "@/lib/reportTypeArabicNames";
import { AxiosError, type AxiosResponse } from "axios";
import FileSaver from "file-saver";
import type { OrdersFilter } from "./getOrders";

type CreateReportWithAllOrdersPayload = {
    type: keyof typeof reportTypeArabicNames;
    companyID?: number;
    deliveryAgentID?: number;
    governorate?: keyof typeof governorateArabicNames;
    branchID?: number;
    clientID?: number;
    storeID?: number;
    repositoryID?: number;
    ordersIDs: "*";
    params: OrdersFilter;
    baghdadDeliveryCost?: number;
    governoratesDeliveryCost?: number;
    deliveryAgentDeliveryCost?: number;
};

export type CreateReportWithIDsPayload = {
    type: keyof typeof reportTypeArabicNames;
    secondaryType?: "RETURNED";
    companyID?: number;
    deliveryAgentID?: number;
    governorate?: keyof typeof governorateArabicNames;
    branchID?: number;
    clientID?: number;
    storeID?: number;
    repositoryID?: number;
    ordersIDs: number[];
    params?: OrdersFilter;
    baghdadDeliveryCost?: number;
    governoratesDeliveryCost?: number;
    deliveryAgentDeliveryCost?: number;
};

export type CreateReportPayload = CreateReportWithAllOrdersPayload | CreateReportWithIDsPayload;

export const createReportService = async (data: CreateReportPayload) => {
    try {
        const response = await api.post<CreateReportPayload, AxiosResponse<any>>(
            createReportEndpoint,
            {
                ...data
            },
            {
                responseType: "arraybuffer",
                params: reduceUnusedReportsFilters(data.params)
            }
        );

        const contentType = response.headers["content-type"];

        if (contentType === "application/pdf") {
            const blob = new Blob([response.data], { type: "application/pdf" });
            FileSaver.saveAs(blob, "كشف.pdf");
            return;
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            const data = JSON.parse(new TextDecoder().decode(error.response?.data));
            throw data;
        }
    }
};
