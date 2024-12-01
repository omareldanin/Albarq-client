import { useRepositories } from "@/hooks/useRepositories";
import { getSelectOptions } from "@/lib/getSelectOptions";
import type { APIError } from "@/models";
import {
    repositoryConfirmOrderByReceiptNumberService,
    type RepositoryConfirmOrderByReceiptNumberPayload
} from "@/services/repositoryConfirmOrderByReceiptNumber";
import { Button, Select, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const SendOrderToRepository = () => {
    const queryClient = useQueryClient();
    const [receiptNumber, setReceiptNumber] = useState("");

    // const {
    //     mutate: getOrderDetails,
    //     reset: resetOrderDetails,
    //     isLoading: isGettingOrderDetailsLoading
    // } = useOrderDetailsByReceiptNumberAction();

    const { data: repositoriesData } = useRepositories({
        size: 100000,
        minified: true
    });
    const [selectedRepository, setSelectedRepository] = useState<string | null>(null);

    const { mutate: repositoryConfirmOrderByReceiptNumber, isLoading } = useMutation({
        mutationFn: (data: RepositoryConfirmOrderByReceiptNumberPayload) => {
            return repositoryConfirmOrderByReceiptNumberService({
                receiptNumber: Number.parseInt(receiptNumber),
                data
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            });
            toast.success("تم تعديل حالة الطلب بنجاح");
            setReceiptNumber("");
        },
        onError: (error: AxiosError<APIError>) => {
            toast.error(error.response?.data.message || "حدث خطأ ما");
        }
    });

    const handleRepositoryConfirmOrderByReceiptNumber = () => {
        if (!receiptNumber) {
            toast.error("أدخل رقم الوصل");
            return;
        }
        if (!selectedRepository) {
            toast.error("اختر المخزن");
            return;
        }
        repositoryConfirmOrderByReceiptNumber({
            repositoryID: Number.parseInt(selectedRepository || "")
        });
    };

    // const { mutate: changeStatus, isLoading } = useChangeOrderStatus();

    // const handleChangeOrderStatus = () => {
    //     if (receiptNumber.length === 0) {
    //         toast.error("أدخل رقم الوصل");
    //         return;
    //     }

    //     getOrderDetails(receiptNumber, {
    //         onSuccess: ({ data }) => {
    //             if (!data?.orders?.[0].id) {
    //                 toast.error("الطلب غير موجود");
    //                 return;
    //             }
    //             changeStatus(
    //                 {
    //                     id: Number(data?.orders?.[0].id),
    //                     data: {
    //                         repositoryID: Number(selectedRepository),
    //                         status: "RETURNED",
    //                         secondaryStatus: "IN_REPOSITORY"
    //                     }
    //                 },
    //                 {
    //                     onSuccess: () => {
    //                         queryClient.invalidateQueries({
    //                             queryKey: ["orders"]
    //                         });
    //                         toast.success("تم تعديل حالة الطلب بنجاح");
    //                         setReceiptNumber("");
    //                         // setSelectedRepository(null);
    //                         resetOrderDetails();
    //                     }
    //                 }
    //             );
    //         }
    //     });
    // };

    return (
        <div className="flex gap-4 items-center">
            <TextInput
                placeholder="أدخل رقم الوصل"
                value={receiptNumber}
                onChange={(event) => setReceiptNumber(event.currentTarget.value)}
                label="تأكيد مباشر برقم الوصل"
                type="number"
            />
            <Select
                value={selectedRepository}
                allowDeselect
                label="المخزن"
                searchable
                clearable
                onChange={(e) => {
                    setSelectedRepository(e);
                }}
                placeholder="اختر المخزن"
                data={getSelectOptions(repositoriesData?.data || [])}
                limit={100}
            />
            <Button
                className="mt-6"
                disabled={isLoading}
                onClick={handleRepositoryConfirmOrderByReceiptNumber}
            >
                تأكيد
            </Button>
        </div>
    );
};
