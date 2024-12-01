import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Client } from "@/services/getClients";
import { Avatar, Badge } from "@mantine/core";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { EditDeliveryCostsModal } from "./EditDeliveryCostsModal";
import { DeleteClient } from "./delete-client";

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "avatar",
        header: "الصورة",
        cell: ({ row }) => {
            const { avatar } = row.original;
            return <Avatar src={avatar} alt="avatar" size="lg" />;
        }
    },
    {
        accessorKey: "name",
        header: "الاسم"
    },
    {
        accessorKey: "branch.name",
        header: "الفرع",
        cell: ({ row }) => {
            const { branch } = row.original;
            return <div>{branch?.name || "لا يوجد"}</div>;
        }
    },
    {
        accessorKey: "company.name",
        header: "الشركة"
    },
    {
        accessorKey: "phone",
        header: "رقم الهاتف"
    },
    {
        accessorKey: "role",
        header: "نوع الحساب",
        cell: ({ row }) => {
            const { role } = row.original;
            return (
                <div>{role === "CLIENT" ? <Badge>عميل</Badge> : <Badge color="red">مساعد عميل</Badge>}</div>
            );
        }
    },
    {
        header: "تم الانشاء بواسطة",
        accessorKey: "createdBy.name"
    },
    {
        header: "تكلفة التوصيل",
        cell: ({ row }) => {
            const { id, governoratesDeliveryCosts } = row.original;
            return (
                <EditDeliveryCostsModal clientId={id} governoratesDeliveryCosts={governoratesDeliveryCosts} />
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <DropdownMenu dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <Link
                            className={buttonVariants({
                                variant: "ghost",
                                className: "w-full"
                            })}
                            to={`/clients/${id}/show`}
                        >
                            عرض
                        </Link>
                        <Link
                            className={buttonVariants({
                                variant: "ghost",
                                className: "w-full"
                            })}
                            to={`/clients/${id}/edit`}
                        >
                            تعديل
                        </Link>
                        <DeleteClient clientId={id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
