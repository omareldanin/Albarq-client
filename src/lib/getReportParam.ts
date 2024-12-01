export const withReportsDataOptions = [
    {
        label: "بدون كشف",
        value: "0"
    },
    {
        label: "مع كشف",
        value: "1"
    }
];

export const processedOrdersOptions = [
    {
        label: "معالج",
        value: "1"
    },
    {
        label: "غير معالج",
        value: "0"
    }
];

export const getReportParam = (value?: string | null): boolean | undefined => {
    if (value === "1") return true;
    if (value === "0") return false;
    return undefined;
};
