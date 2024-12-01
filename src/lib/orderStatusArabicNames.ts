enum OrderStatus {
    REGISTERED = "تم الطلب",
    READY_TO_SEND = "جاهز للشحن",
    WITH_DELIVERY_AGENT = "مع السائق",
    DELIVERED = "تم التوصيل",
    REPLACED = "تم الاستبدال",
    PARTIALLY_RETURNED = "مرتجع جزئي",
    RETURNED = "مرتجع",
    POSTPONED = "مؤجل",
    CHANGE_ADDRESS = "تغيير عنوان",
    RESEND = "إعادة إرسال",
    WITH_RECEIVING_AGENT = "مع السائق الاستلام",
    PROCESSING = "قيد التنفيذ"
}

export const orderStatusArabicNames = {
    REGISTERED: "تم الطلب",
    READY_TO_SEND: "جاهز للشحن",
    WITH_DELIVERY_AGENT: "مع السائق",
    DELIVERED: "تم التوصيل",
    REPLACED: "تم الاستبدال",
    PARTIALLY_RETURNED: "مرتجع جزئي",
    RETURNED: "مرتجع",
    POSTPONED: "مؤجل",
    CHANGE_ADDRESS: "تغيير عنوان",
    RESEND: "إعادة إرسال",
    WITH_RECEIVING_AGENT: "مع السائق الاستلام",
    PROCESSING: "قيد التنفيذ"
};

export const orderStatusArray: { label: string; value: string }[] = Object.entries(OrderStatus).map(
    ([value, label]) => ({
        label,
        value
    })
);
