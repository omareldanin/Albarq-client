import type { ColumnDef } from "@tanstack/react-table";
import type { OrderSheet } from "..";

export const columns: ColumnDef<OrderSheet>[] = [
    {
        id: "orderNumber",
        accessorKey: "orderNumber",
        header: "رقم الوصل"
    },
    {
        accessorKey: "Governorate",
        header: "المحافظة"
    },
    {
        accessorKey: "city",
        header: "المنطقة"
    },
    {
        accessorKey: "customerName",
        header: "اسم العميل"
    },
    {
        accessorKey: "phoneNumber",
        header: "رقم الهاتف"
    },
    {
        accessorKey: "total",
        header: "المبلغ",
        cell: ({ row }) => {
            const { total } = row.original;
            const formattedNumber = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return formattedNumber;
        }
    },
    {
        header: "ملاحظات",
        accessorKey: "notes"
    }
];
