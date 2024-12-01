import { useChangeOrderStatus } from "@/hooks/useChangeOrderStatus";
import { useDeactivateOrder } from "@/hooks/useDeactivateOrder";
import { useClientOrdersStore } from "@/store/confirmClientOrders";
import { Button } from "@mantine/core";
import toast from "react-hot-toast";

export const ClientOrdersActions = () => {
    const { clientOrders, deleteAllClientOrders } = useClientOrdersStore();
    const { mutate: confirmOrder, isLoading } = useChangeOrderStatus();
    const { mutateAsync: deleteOrder, isLoading: isDeletingOrderLoading } = useDeactivateOrder();

    const handleConfirmOrder = () => {
        clientOrders.forEach((order) => {
            confirmOrder({
                id: Number(order.id),
                data: {
                    confirmed: true
                }
            });
        });
        toast.success("تم تعديل حالة الطلب بنجاح");
        deleteAllClientOrders();
    };

    const handleDeleteOrders = () => {
        clientOrders.forEach((order) => {
            deleteOrder(Number(order.id));
        });
        toast.success("تم حذف الطلبات بنجاح");
        deleteAllClientOrders();
    };

    return (
        <div className="flex items-center gap-6 mb-4">
            <Button
                disabled={clientOrders.length === 0 || isLoading || isDeletingOrderLoading}
                onClick={handleConfirmOrder}
            >
                تأكيد الطلبات المحددة
            </Button>
            <Button
                disabled={clientOrders.length === 0 || isLoading || isDeletingOrderLoading}
                onClick={handleDeleteOrders}
            >
                مسح الطلبات المحددة
            </Button>
        </div>
    );
};
