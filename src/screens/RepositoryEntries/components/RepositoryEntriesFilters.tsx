import { useBranches } from "@/hooks/useBranches";
import { useClients } from "@/hooks/useClients";
import { useEmployees } from "@/hooks/useEmployees";
import { useRepositories } from "@/hooks/useRepositories";
import { useStores } from "@/hooks/useStores";
import { useTenants } from "@/hooks/useTenants";
import { convertDateFormat } from "@/lib/convertDate";
import { withReportsDataOptions } from "@/lib/getReportParam";
import { getSelectOptions } from "@/lib/getSelectOptions";
import { governorateArray } from "@/lib/governorateArabicNames ";
import { repositoryEntriesStatuses } from "@/lib/repositoryEntriesStatuses";
import type { OrdersFilter } from "@/services/getOrders";
import { Accordion, Button, Grid, MultiSelect, Select, TagsInput, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

interface RepositoryEntriesFiltersProps {
    filters: OrdersFilter;
    setFilters: React.Dispatch<React.SetStateAction<OrdersFilter>>;
    search: string;
    setSearch: (newValue: string) => void;
    receiptError: string | null;
}

export const RepositoryEntriesFilters = ({
    filters,
    setFilters,
    search,
    setSearch,
    receiptError
}: RepositoryEntriesFiltersProps) => {
    const { data: repositoriesData } = useRepositories({
        size: 100000,
        minified: true
    });

    const { data: branchesData } = useBranches({
        size: 100000,
        minified: true
    });
    const { data: clientsData } = useClients({
        size: 100000,
        minified: true
    });
    const { data: storesData } = useStores({
        size: 100000,
        minified: true
    });
    const { data: employeesData } = useEmployees({
        size: 100000,
        minified: true,
        roles: ["DELIVERY_AGENT"]
    });

    const { data: tenants = { data: [] } } = useTenants({
        size: 100000,
        minified: true
    });
    const { data: repositories = { data: [] } } = useRepositories({
        size: 100000,
        minified: true
    });

    const handleResetRangeDate = () => {
        setFilters({
            ...filters,
            start_date: null,
            end_date: null
        });
    };

    return (
        <div>
            <Accordion variant="separated">
                <Accordion.Item className="rounded-md mb-8" value="orders-filter">
                    <Accordion.Control> الفلاتر</Accordion.Control>
                    <Accordion.Panel>
                        <Grid gutter="lg">
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <TagsInput
                                    placeholder="برقم الوصل"
                                    value={filters.receipt_numbers}
                                    label="بحث برقم الوصل"
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            receipt_numbers: e
                                        });
                                    }}
                                    error={receiptError}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <TextInput
                                    placeholder="رقم, اسم, عنوان او رقم هاتف المستلم"
                                    defaultValue={search}
                                    label="بحث"
                                    onChange={(e) => {
                                        setSearch(e.currentTarget.value);
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    data={getSelectOptions(repositoriesData?.data || [])}
                                    searchable
                                    clearable
                                    placeholder="المخزن"
                                    label="المخزن"
                                    limit={100}
                                    value={filters.repository_id}
                                    onChange={(value) => {
                                        setFilters({
                                            ...filters,
                                            repository_id: value
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    data={getSelectOptions(branchesData?.data || [])}
                                    searchable
                                    clearable
                                    placeholder="الفرع"
                                    label="الفرع"
                                    limit={100}
                                    value={filters.branch_id}
                                    onChange={(value) => {
                                        setFilters({
                                            ...filters,
                                            branch_id: value
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    searchable
                                    label="المحافظة"
                                    placeholder="اختار المحافظة"
                                    limit={100}
                                    data={governorateArray}
                                    clearable
                                    value={filters.governorate}
                                    onChange={(value) => {
                                        setFilters({
                                            ...filters,
                                            governorate: value || ""
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    data={getSelectOptions(branchesData?.data || [])}
                                    searchable
                                    clearable
                                    placeholder="الفرع المرسل اليه"
                                    label="الفرع المرسل اليه"
                                    limit={100}
                                    value={filters.branch_id}
                                    onChange={(value) => {
                                        setFilters({
                                            ...filters,
                                            branch_id: value
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <MultiSelect
                                    data={repositoryEntriesStatuses}
                                    searchable
                                    clearable
                                    placeholder="الحالة"
                                    label="الحالة"
                                    limit={100}
                                    value={filters.statuses}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            statuses: e || ""
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    data={getSelectOptions(clientsData?.data || [])}
                                    searchable
                                    clearable
                                    placeholder="العميل"
                                    label="العميل"
                                    limit={100}
                                    value={filters.client_id}
                                    onChange={(value) => {
                                        setFilters({
                                            ...filters,
                                            client_id: value || ""
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    data={getSelectOptions(storesData?.data || [])}
                                    searchable
                                    clearable
                                    placeholder="المتجر"
                                    label="المتجر"
                                    limit={100}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            store_id: e || ""
                                        });
                                    }}
                                    value={filters.store_id}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    searchable
                                    label="الشركة"
                                    placeholder="اختار الشركة"
                                    data={getSelectOptions(tenants.data)}
                                    limit={100}
                                    clearable
                                    value={filters.company_id}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            company_id: e || ""
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    searchable
                                    label="المخزن"
                                    placeholder="اختار المخزن"
                                    data={getSelectOptions(repositories.data)}
                                    limit={100}
                                    clearable
                                    value={filters.repository_id}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            repository_id: e || ""
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    data={getSelectOptions(employeesData?.data || [])}
                                    searchable
                                    clearable
                                    placeholder="مندوب التوصيل"
                                    label="مندوب التوصيل"
                                    limit={100}
                                    value={filters.delivery_agent_id?.toString()}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            delivery_agent_id: e || ""
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    label="كشف رواجع عميل"
                                    placeholder="كشف رواجع عميل"
                                    data={withReportsDataOptions}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            client_report: e
                                        });
                                    }}
                                    defaultValue={filters.client_report}
                                    clearable
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    label="كشف رواجع للشركة"
                                    placeholder="كشف رواجع للشركة"
                                    data={withReportsDataOptions}
                                    clearable
                                    defaultValue={filters.company_report}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            company_report: e
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
                                <Select
                                    label="كشف المخزن"
                                    placeholder="كشف المخزن"
                                    data={withReportsDataOptions}
                                    clearable
                                    defaultValue={filters.repository_report}
                                    onChange={(e) => {
                                        setFilters({
                                            ...filters,
                                            repository_report: e
                                        });
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ md: 12, lg: 12, sm: 12, xs: 12 }}>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <DateTimePicker
                                        className="w-60"
                                        valueFormat="DD MMM YYYY hh:mm A"
                                        label="بداية تاريخ الطلب"
                                        value={filters.start_date ? new Date(filters.start_date) : null}
                                        placeholder="اختر تاريخ البداية"
                                        locale="ar"
                                        clearable
                                        onChange={(date) => {
                                            const formattedDate = convertDateFormat(date);
                                            setFilters({
                                                ...filters,
                                                start_date: formattedDate
                                            });
                                        }}
                                    />
                                    <DateTimePicker
                                        className="w-60"
                                        valueFormat="DD MMM YYYY hh:mm A"
                                        label="نهاية تاريخ الطلب"
                                        placeholder="اختر تاريخ النهاية"
                                        value={filters.end_date ? new Date(filters.end_date) : null}
                                        locale="ar"
                                        clearable
                                        onChange={(date) => {
                                            const formattedDate = convertDateFormat(date);
                                            setFilters({
                                                ...filters,
                                                end_date: formattedDate
                                            });
                                        }}
                                    />
                                    {filters.end_date && filters.start_date && (
                                        <Button
                                            onClick={handleResetRangeDate}
                                            className="mt-6"
                                            variant="outline"
                                        >
                                            الحذف
                                        </Button>
                                    )}
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};
