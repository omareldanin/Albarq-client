import { convertDateFormat } from "@/lib/convertDate";
import { getSelectOptions } from "@/lib/getSelectOptions";
import type { OrdersFilter } from "@/services/getOrders";
import { Button, Grid, MultiSelect, Paper, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "dayjs/locale/ar";
import { useBranches } from "@/hooks/useBranches";
import { useEmployees } from "@/hooks/useEmployees";
import { governorateArray } from "@/lib/governorateArabicNames ";
import { reportOrderStatuses } from "@/lib/reportOrderStatuses";
import { reportStatusArray } from "@/lib/reportStatusArabicNames";
import type { ReportsFilters } from "@/services/getReports";

interface BranchOrdersFiltersProps {
    ordersFilters: OrdersFilter;
    setOrdersFilters: React.Dispatch<React.SetStateAction<OrdersFilter>>;
    reportsFilters: ReportsFilters;
    setReportsFilters: React.Dispatch<React.SetStateAction<ReportsFilters>>;
}

export const BranchOrdersFilters = ({
    ordersFilters,
    setOrdersFilters,
    reportsFilters,
    setReportsFilters
}: BranchOrdersFiltersProps) => {
    const {
        data: branchesData = {
            data: []
        }
    } = useBranches({ size: 100000, minified: true });

    const {
        data: reportCreatedBy = {
            data: []
        }
    } = useEmployees({
        size: 100000,
        minified: true,
        roles: [
            "ACCOUNTANT",
            "ACCOUNT_MANAGER",
            "BRANCH_MANAGER",
            "COMPANY_MANAGER",
            "DATA_ENTRY",
            "EMERGENCY_EMPLOYEE",
            "INQUIRY_EMPLOYEE",
            "RECEIVING_AGENT",
            "REPOSITORIY_EMPLOYEE"
        ]
    });

    const handleResetOrdersRangeDate = () => {
        setOrdersFilters({
            ...ordersFilters,
            start_date: null,
            end_date: null
        });
    };

    const handleResetReportsRangeDate = () => {
        setReportsFilters({
            ...reportsFilters,
            start_date: null,
            end_date: null
        });
    };

    return (
        <Paper className="p-4" withBorder>
            <Grid grow className="mb-5">
                <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
                    <Select
                        value={ordersFilters.branch_id}
                        allowDeselect
                        label="الفرع"
                        searchable
                        clearable
                        onChange={(e) => {
                            setOrdersFilters({
                                ...ordersFilters,
                                branch_id: e || ""
                            });
                            setReportsFilters({
                                ...reportsFilters,
                                branch_id: e || ""
                            });
                        }}
                        placeholder="اختر الفرع"
                        limit={100}
                        data={getSelectOptions(branchesData.data)}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
                    <Select
                        value={reportsFilters.created_by_id}
                        allowDeselect
                        label="ساحب الكشف"
                        searchable
                        clearable
                        onChange={(e) => {
                            setReportsFilters({
                                ...reportsFilters,
                                created_by_id: e || ""
                            });
                        }}
                        placeholder="اختر ساحب الكشف"
                        data={getSelectOptions(reportCreatedBy.data)}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
                    <Select
                        value={reportsFilters.governorate}
                        allowDeselect
                        label="المحافظة"
                        searchable
                        clearable
                        onChange={(e) => {
                            setReportsFilters({
                                ...reportsFilters,
                                governorate: e || ""
                            });
                            setOrdersFilters({
                                ...ordersFilters,
                                governorate: e || ""
                            });
                        }}
                        placeholder="اختر المحافظة"
                        data={governorateArray}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4, sm: 12, xs: 12 }}>
                    <Select
                        value={reportsFilters.status}
                        allowDeselect
                        label="حالة الكشف"
                        searchable
                        clearable
                        onChange={(e) => {
                            setReportsFilters({
                                ...reportsFilters,
                                status: e || ""
                            });
                        }}
                        placeholder="اختر الحالة"
                        data={reportStatusArray}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4, sm: 12, xs: 12 }}>
                    <MultiSelect
                        value={ordersFilters.statuses}
                        label="حالة الطلب"
                        searchable
                        clearable
                        onChange={(e) => {
                            setOrdersFilters({
                                ...ordersFilters,
                                statuses: e || ""
                            });
                        }}
                        placeholder="اختر الحالة"
                        data={reportOrderStatuses}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6, sm: 12, xs: 12 }}>
                    <div className="flex items-center gap-4 flex-wrap">
                        <DateTimePicker
                            className="w-60"
                            valueFormat="DD MMM YYYY hh:mm A"
                            label="بداية تاريخ الطلب"
                            value={ordersFilters.start_date ? new Date(ordersFilters.start_date) : null}
                            placeholder="اختر تاريخ البداية"
                            locale="ar"
                            clearable
                            onChange={(date) => {
                                const formattedDate = convertDateFormat(date);
                                setOrdersFilters({
                                    ...ordersFilters,
                                    start_date: formattedDate
                                });
                            }}
                        />
                        <DateTimePicker
                            className="w-60"
                            valueFormat="DD MMM YYYY hh:mm A"
                            label="نهاية تاريخ الطلب"
                            placeholder="اختر تاريخ النهاية"
                            value={ordersFilters.end_date ? new Date(ordersFilters.end_date) : null}
                            locale="ar"
                            clearable
                            onChange={(date) => {
                                const formattedDate = convertDateFormat(date);
                                setOrdersFilters({
                                    ...ordersFilters,
                                    end_date: formattedDate
                                });
                            }}
                        />
                        {ordersFilters.end_date && ordersFilters.start_date && (
                            <Button onClick={handleResetOrdersRangeDate} className="mt-6" variant="outline">
                                الحذف
                            </Button>
                        )}
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6, sm: 12, xs: 12 }}>
                    <div className="flex items-center gap-4 flex-wrap">
                        <DateTimePicker
                            className="w-60"
                            valueFormat="DD MMM YYYY hh:mm A"
                            label="بداية تاريخ الكشف"
                            value={reportsFilters.start_date ? new Date(reportsFilters.start_date) : null}
                            placeholder="اختر تاريخ البداية"
                            locale="ar"
                            clearable
                            onChange={(date) => {
                                const formattedDate = convertDateFormat(date);
                                setReportsFilters({
                                    ...reportsFilters,
                                    start_date: formattedDate
                                });
                            }}
                        />
                        <DateTimePicker
                            className="w-60"
                            valueFormat="DD MMM YYYY hh:mm A"
                            label="نهاية تاريخ الكشف"
                            placeholder="اختر تاريخ النهاية"
                            value={reportsFilters.end_date ? new Date(reportsFilters.end_date) : null}
                            locale="ar"
                            clearable
                            onChange={(date) => {
                                const formattedDate = convertDateFormat(date);
                                setReportsFilters({
                                    ...reportsFilters,
                                    end_date: formattedDate
                                });
                            }}
                        />
                        {reportsFilters.end_date && reportsFilters.start_date && (
                            <Button onClick={handleResetReportsRangeDate} className="mt-6" variant="outline">
                                الحذف
                            </Button>
                        )}
                    </div>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};
