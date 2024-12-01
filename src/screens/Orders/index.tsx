import { AppLayout } from "@/components/AppLayout";
import { useOrders } from "@/hooks/useOrders";
import type { OrdersFilter, OrdersMetaData } from "@/services/getOrders";
import { useAuth } from "@/store/authStore";
import { LoadingOverlay } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { columns } from "./columns";
import { CustomOrdersFilter } from "./components/OrdersFilter";
import { OrdersStatistics } from "./components/OrdersStatistics";
import { OrdersTable } from "./components/OrdersTable";

export const ordersFilterInitialState: OrdersFilter = {
    page: 1,
    size: 10,
    client_id: "",
    delivery_agent_id: "",
    delivery_date: null,
    delivery_type: "",
    end_date: "",
    governorate: "",
    location_id: "",
    pagesCount: 0,
    product_id: "",
    receipt_number: "",
    recipient_address: "",
    recipient_name: "",
    recipient_phone: "",
    search: "",
    sort: "",
    start_date: "",
    statuses: [],
    status: "",
    store_id: "",
    branch_id: "",
    automatic_update_id: "",
    minified: false,
    confirmed: true,
    branch_report: "0",
    client_report: "0",
    company_report: "0",
    delivery_agent_report: "0",
    governorate_report: "0",
    repository_report: "0",
    processed: "0"
};

interface OrdersSearchParameters {
    delivery_agent_id: string;
    orders_end_date: string;
    orders_start_date: string;
    branch_id: string;
    automatic_update_id: string;
}

export const OrdersScreen = () => {
    const { role } = useAuth();
    const location = useLocation();
    const [filters, setFilters] = useState<OrdersFilter>({
        ...ordersFilterInitialState,
        branch_report: undefined,
        client_report: undefined,
        company_report: undefined,
        delivery_agent_report: undefined,
        governorate_report: undefined,
        repository_report: undefined,
        processed: undefined
    });
    const [search, setSearch] = useDebouncedState("", 300);

    const locationState = location.state as OrdersSearchParameters;

    useEffect(() => {
        if (locationState?.delivery_agent_id) {
            setFilters((prev) => ({
                ...prev,
                delivery_agent_id: locationState?.delivery_agent_id
            }));
        }
        if (locationState?.orders_end_date) {
            setFilters((prev) => ({
                ...prev,
                end_date: new Date(locationState?.orders_end_date)
            }));
        }
        if (locationState?.orders_start_date) {
            setFilters((prev) => ({
                ...prev,
                start_date: new Date(locationState?.orders_start_date)
            }));
        }
        if (locationState?.automatic_update_id) {
            setFilters((prev) => ({
                ...prev,
                automatic_update_id: locationState?.automatic_update_id
            }));
        }
    }, [
        locationState?.delivery_agent_id,
        locationState?.orders_end_date,
        locationState?.orders_start_date,
        locationState?.automatic_update_id
    ]);

    const [receiptError, setReceiptError] = useState<string | null>(null);

    const {
        data: orders = {
            data: {
                orders: [],
                ordersMetaData: {} as OrdersMetaData
            },
            pagesCount: 0
        },
        isError,
        isInitialLoading,
        isFetching
    } = useOrders({
        ...filters,
        search
    });

    useEffect(() => {
        if (filters.receipt_numbers && filters.receipt_numbers.length > 0) {
            if (!isFetching && filters.receipt_numbers.length !== orders.data.orders.length) {
                setReceiptError("لم يتم العثور على طلبات بهذا الرقم");
                toast.error("لم يتم العثور على طلبات بهذا الرقم");
                // Clear the receipt numbers after a short delay
                setTimeout(() => {
                    filters.receipt_numbers?.pop();
                    setFilters((prev) => ({
                        ...prev,
                        receipt_numbers: filters.receipt_numbers
                    }));
                    setReceiptError(null);
                }, 3000);
            } else {
                setReceiptError(null);
            }
        } else {
            setReceiptError(null);
        }
    }, [filters.receipt_numbers, isFetching, orders.data.orders]);

    return (
        <AppLayout isError={isError}>
            <CustomOrdersFilter
                filters={filters}
                search={search}
                setFilters={setFilters}
                currentPageOrdersIDs={orders.data.orders.map((order) => order.id)}
                setSearch={setSearch}
                receiptError={receiptError}
            />
            <div className="relative mt-12">
                <LoadingOverlay visible={isInitialLoading} />
                <OrdersStatistics ordersMetaData={orders.data.ordersMetaData} />
                <OrdersTable
                    navigationURL={
                        // eslint-disable-next-line no-nested-ternary
                        role === "CLIENT"
                            ? "/orders-bulk-create"
                            : role !== "ADMIN_ASSISTANT" && role !== "ADMIN"
                              ? "/orders-bulk-create"
                              : ""
                    }
                    columns={columns}
                    data={orders.data.orders}
                    setFilters={setFilters}
                    filters={{
                        ...filters,
                        pagesCount: orders.pagesCount
                    }}
                />
            </div>
        </AppLayout>
    );
};
