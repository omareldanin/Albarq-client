import { useCreateReport } from "@/hooks/useCreateReport";
import { transformOrdersFilterToMatchReportParams } from "@/lib/transformOrdersFilterToMatchReportParams";
import type { CreateReportPayload } from "@/services/createReport";
import type { OrdersFilter, OrdersMetaData } from "@/services/getOrders";
import { Button, Grid, NumberInput } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { StatisticsItem } from "../../StatisticsItem";

interface BranchesOrdersStatisticsProps {
    ordersParams: OrdersFilter;
    branchId: string;
    ordersMetaData: OrdersMetaData;
    ordersLength: number;
}

export const BranchesOrdersStatistics = ({
    ordersParams,
    branchId,
    ordersMetaData,
    ordersLength
}: BranchesOrdersStatisticsProps) => {
    const [deliveryAgentDeliveryCost, setDeliveryAgentDeliveryCost] = useState<string | number>(0);
    const { mutateAsync: createReport, isLoading } = useCreateReport();

    const handleCreateReport = () => {
        if (!deliveryAgentDeliveryCost) {
            toast.error("الرجاء ادخال اجور التوصيل");
            return;
        }
        const mutationParams: CreateReportPayload = {
            ordersIDs: "*",
            params: transformOrdersFilterToMatchReportParams(ordersParams),
            type: "BRANCH",
            branchID: Number(branchId),
            deliveryAgentDeliveryCost: Number(deliveryAgentDeliveryCost)
        };
        toast.promise(
            createReport(mutationParams, {
                onSuccess: () => {
                    setDeliveryAgentDeliveryCost(0);
                }
            }),
            {
                loading: "جاري تصدير الكشف",
                success: "تم تصدير الكشف بنجاح",
                error: (error) => error.message || "حدث خطأ ما"
            }
        );
    };

    return (
        <Grid align="center" className="mt-4" grow>
            <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
                <StatisticsItem title="عدد الطلبيات" value={ordersMetaData.count} />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
                <StatisticsItem title="المبلغ الكلي" value={ordersMetaData.totalCost} />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
                <StatisticsItem title="مبلغ التوصيل" value={ordersMetaData.deliveryCost} />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
                <StatisticsItem title="صافي العميل" value={ordersMetaData.clientNet} />
            </Grid.Col>
            <Grid.Col span={{ md: 3, lg: 2, sm: 6, xs: 6 }}>
                <NumberInput
                    label="اجور توصيل المندوب"
                    value={deliveryAgentDeliveryCost}
                    onChange={(e) => setDeliveryAgentDeliveryCost(e)}
                    placeholder="اجور توصيل المندوب"
                />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3, lg: 2, sm: 12, xs: 12 }}>
                <Button
                    disabled={ordersLength === 0 || isLoading || !branchId}
                    onClick={handleCreateReport}
                    loading={isLoading}
                >
                    انشاء كشف فرع
                </Button>
            </Grid.Col>
        </Grid>
    );
};
