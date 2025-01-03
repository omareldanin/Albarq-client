import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Store } from "@/services/getStores";
import { Avatar } from "@mantine/core";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { ChangeStoreClientAssistant } from "./ChangeStoreClientAssistant";
import { DeleteStore } from "./delete-store";

export const columns: ColumnDef<Store>[] = [
    {
        accessorKey: "id",
        header: "#"
    },
    {
        accessorKey: "logo",
        header: "الصورة",
        cell: ({ row }) => {
            const { logo } = row.original;
            return <Avatar src={logo} radius="xl" size="lg" />;
        }
    },
    {
        accessorKey: "name",
        header: "الاسم"
    },
    {
        accessorKey: "client.name",
        header: "العميل",
        cell: ({ row }) => {
            const { client } = row.original;
            return (
                <Link
                    to={`/clients/${client.id}/show`}
                    className={buttonVariants({
                        variant: "link",
                        className: "text-primary-foreground underline"
                    })}
                >
                    {client.name}
                </Link>
            );
        }
    },
    {
        accessorKey: "clientAssistant.name",
        header: "مساعد العميل",
        cell: ({ row }) => {
            const { clientAssistant, id } = row.original;
            return <ChangeStoreClientAssistant id={id} clientAssistant={clientAssistant} />;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const store = row.original;
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
                            to={`/stores/${store.id}/show`}
                        >
                            عرض
                        </Link>
                        <Link
                            className={buttonVariants({
                                variant: "ghost",
                                className: "w-full"
                            })}
                            to={`/stores/${store.id}/edit`}
                        >
                            تعديل
                        </Link>
                        <DeleteStore storeId={store.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
