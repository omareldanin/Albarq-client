import { useClientByStoreId } from "@/hooks/useClients";
import { useCreateReport } from "@/hooks/useCreateReport";
import { transformOrdersFilterToMatchReportParams } from "@/lib/transformOrdersFilterToMatchReportParams";
import type { CreateReportPayload } from "@/services/createReport";
import type { OrdersFilter, OrdersMetaData } from "@/services/getOrders";
import { useAuth } from "@/store/authStore";
import { Button, Grid, NumberInput } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { StatisticsItem } from "../../StatisticsItem";

interface ClientOrdersStatisticsProps {
    storeID: string;
    ordersMetaData: OrdersMetaData;
    ordersParams: OrdersFilter;
    ordersLength: number;
}

export const ClientOrdersStatistics = ({
    storeID,
    ordersMetaData,
    ordersLength,
    ordersParams
}: ClientOrdersStatisticsProps) => {
    const { role } = useAuth();
    const [baghdadDeliveryCost, setBaghdadDeliveryCost] = useState<number | string>(0);
    const [governoratesDeliveryCost, setGovernoratesDeliveryCost] = useState<number | string>(0);
    const { mutateAsync: createReport, isLoading } = useCreateReport();

    const { mutate: getClientId } = useClientByStoreId();

    const handleCreateReport = () => {
        if (!baghdadDeliveryCost && !governoratesDeliveryCost) {
            toast.error("الرجاء ادخال اجور التوصيل");
            return;
        }

        getClientId(storeID, {
            onSuccess({ data }) {
                const mutationParams: CreateReportPayload = {
                    ordersIDs: "*",
                    params: transformOrdersFilterToMatchReportParams(ordersParams),
                    type: "CLIENT",
                    storeID: Number(storeID),
                    clientID: data[0].id,
                    baghdadDeliveryCost: Number(baghdadDeliveryCost),
                    governoratesDeliveryCost: Number(governoratesDeliveryCost)
                };

                toast.promise(
                    createReport(mutationParams, {
                        onSuccess: () => {
                            setBaghdadDeliveryCost(0);
                            setGovernoratesDeliveryCost(0);
                        }
                    }),
                    {
                        loading: "جاري تصدير الكشف",
                        success: "تم تصدير الكشف بنجاح",
                        error: (error) => error.message || "حدث خطأ ما"
                    }
                );
            }
        });
    };
    return (
        <Grid align="center" className="mt-4" grow>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <StatisticsItem title="عدد الطلبيات" value={ordersMetaData.count || 0} />
            </Grid.Col>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <StatisticsItem title="المبلغ الكلي" value={ordersMetaData.totalCost || 0} />
            </Grid.Col>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <StatisticsItem title="مبلغ التوصيل" value={ordersMetaData.deliveryCost || 0} />
            </Grid.Col>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <StatisticsItem title="صافي العميل" value={ordersMetaData.clientNet || 0} />
            </Grid.Col>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <StatisticsItem
                    title="عدد طلبات الراجعة"
                    value={
                        ordersMetaData?.countByStatus?.find((status) => status.status === "RETURNED")
                            ?.count || 0
                    }
                />
            </Grid.Col>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <StatisticsItem
                    title="عدد الطلبات الواصلة"
                    value={
                        ordersMetaData?.countByStatus?.find((status) => status.status === "DELIVERED")
                            ?.count || 0
                    }
                />
            </Grid.Col>
            {role !== "CLIENT" && (
                <>
                    <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                        <NumberInput
                            label="اجور توصيل بغداد"
                            value={baghdadDeliveryCost}
                            onChange={(e) => setBaghdadDeliveryCost(e)}
                            placeholder="اجور توصيل بغداد"
                        />
                    </Grid.Col>
                    <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                        <NumberInput
                            label="اجور توصيل المحافظات"
                            value={governoratesDeliveryCost}
                            onChange={(e) => setGovernoratesDeliveryCost(e)}
                            placeholder="اجور توصيل المحافظات"
                        />
                    </Grid.Col>
                    <Grid.Col className="mt-6" span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                        <Button
                            disabled={ordersLength === 0 || isLoading || !storeID}
                            onClick={handleCreateReport}
                            loading={isLoading}
                        >
                            انشاء كشف عميل
                        </Button>
                    </Grid.Col>
                </>
            )}
        </Grid>
    );
};
