import { orderStatusArabicNames } from "@/lib/orderStatusArabicNames";
import { Badge } from "@mantine/core";

interface Props {
    status: keyof typeof orderStatusArabicNames;
}

export const OrdersBadge = ({ status }: Props) => {
    const mapOrderStatusToColor: Record<keyof typeof orderStatusArabicNames, string> = {
        REGISTERED: "#FFFFFF",
        READY_TO_SEND: "#FFFFFF",
        WITH_DELIVERY_AGENT: "#FFFFFF",
        DELIVERED: "#228B22",
        REPLACED: "#00BFFF",
        PARTIALLY_RETURNED: "#FF4500",
        POSTPONED: "#B8860B",
        CHANGE_ADDRESS: "#8B008B",
        RETURNED: "#FF0000",
        RESEND: "#FFFF00",
        WITH_RECEIVING_AGENT: "#FFFF00",
        PROCESSING: "#FFA500"
    };

    return (
        <Badge
            styles={{
                label: {
                    color: "black"
                }
            }}
            size="md"
            color={mapOrderStatusToColor[status]}
        >
            {orderStatusArabicNames[status]}
        </Badge>
    );
};
