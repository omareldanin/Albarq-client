/* eslint-disable @typescript-eslint/naming-convention */
import { AppLayout } from "@/components/AppLayout";
import { useBranches } from "@/hooks/useBranches";
import { useDeliveryAgentsManifest } from "@/hooks/useDeliveryAgentsManifest";
import { getSelectOptions } from "@/lib/getSelectOptions";
import type { ManifestFilters } from "@/services/getDeliveryAgentManifest";
import { useManifestStore } from "@/store/manifestStore";
import { Accordion, Button, LoadingOverlay, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "dayjs/locale/ar";
import { convertDateFormat } from "@/lib/convertDate";
import { useState } from "react";
import { DataTable } from "../Employees/data-table";
import { columns } from "./columns";

export const DeliveryAgentsManifest = () => {
    const {
        branch_id,
        orders_end_date,
        orders_start_date,
        setBranchId,
        resetFilters,
        setOrdersEndDate,
        setOrdersStartDate
    } = useManifestStore();
    const [filters, setFilters] = useState<ManifestFilters>({
        page: 1,
        size: 10
    });

    const {
        data: agentsManifestData,
        isError,
        isInitialLoading
    } = useDeliveryAgentsManifest({
        branch_id,
        page: filters.page,
        pagesCount: filters.pagesCount,
        size: filters.size,
        orders_end_date: orders_end_date || undefined,
        orders_start_date: orders_start_date || undefined
    });

    const { data: branchesData } = useBranches({
        size: 100000,
        minified: true
    });

    return (
        <AppLayout isError={isError}>
            <Accordion variant="separated">
                <Accordion.Item className="rounded-md mb-8" value="delivery-agents-manifest-filter">
                    <Accordion.Control> الفلاتر</Accordion.Control>
                    <Accordion.Panel>
                        <div className="flex-1 gap-5">
                            <Select
                                key={branch_id}
                                label="الفروع"
                                data={getSelectOptions(branchesData?.data || [])}
                                clearable
                                searchable
                                limit={50}
                                placeholder="اختار الفرع"
                                value={String(branch_id)}
                                onChange={(e) => {
                                    setBranchId(Number(e));
                                }}
                            />
                            <h1 className="font-bold mb-2 text-lg mt-4">تاريخ بداية ونهاية الطلبيات</h1>
                            <div className="flex items-center gap-2 flex-wrap">
                                <DateTimePicker
                                    className="w-60"
                                    valueFormat="DD MMM YYYY hh:mm A"
                                    label="بداية تاريخ الطلب"
                                    value={orders_start_date ? new Date(orders_start_date) : null}
                                    placeholder="اختر تاريخ البداية"
                                    locale="ar"
                                    clearable
                                    onChange={(date) => {
                                        const formattedDate = convertDateFormat(date);
                                        setOrdersStartDate(formattedDate);
                                    }}
                                />
                                <DateTimePicker
                                    className="w-60"
                                    valueFormat="DD MMM YYYY hh:mm A"
                                    label="نهاية تاريخ الطلب"
                                    placeholder="اختر تاريخ النهاية"
                                    value={orders_end_date ? new Date(orders_end_date) : null}
                                    locale="ar"
                                    clearable
                                    onChange={(date) => {
                                        const formattedDate = convertDateFormat(date);
                                        setOrdersEndDate(formattedDate);
                                    }}
                                />
                                {orders_end_date && orders_start_date && (
                                    <Button
                                        onClick={resetFilters}
                                        fullWidth
                                        className="mt-3"
                                        variant="outline"
                                    >
                                        الحذف
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <div className="relative mt-12">
                <LoadingOverlay visible={isInitialLoading} />
                <DataTable
                    navigationURL="/orders/add"
                    columns={columns}
                    data={agentsManifestData?.data || []}
                    setFilters={setFilters}
                    filters={{
                        ...filters,
                        pagesCount: agentsManifestData?.pagesCount
                    }}
                />
            </div>
        </AppLayout>
    );
};
