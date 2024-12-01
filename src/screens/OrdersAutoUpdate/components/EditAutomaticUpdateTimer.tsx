import { useBranches } from "@/hooks/useBranches";
import { useEditAutomaticUpdateTimer } from "@/hooks/useEditAutomaticUpdateTimer";
import { getSelectOptions } from "@/lib/getSelectOptions";
import { type governorateArabicNames, governorateArray } from "@/lib/governorateArabicNames ";
import { orderReturnConditionArray } from "@/lib/orderReturnConditionArabicNames";
import { orderStatusArray } from "@/lib/orderStatusArabicNames";
import type { CreateAutomaticUpdateDatePayload } from "@/services/createAutomaticUpdateDate";
import type { AutomaticUpdate } from "@/services/getAutomaticUpdates";
import { ActionIcon, Button, Modal, NumberInput, Radio, Select, Switch, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import type { z } from "zod";
import { orderStatusAutomaticUpdateCreateSchema } from "./AddAutomaticUpdateTimer.zod";

export const EditAutomaticUpdateTimer = ({
    branch,
    enabled,
    governorate,
    id,
    newOrderStatus,
    orderStatus,
    checkAfter,
    updateAt,
    returnCondition
}: AutomaticUpdate) => {
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        validate: zodResolver(orderStatusAutomaticUpdateCreateSchema),
        initialValues: {
            governorate,
            orderStatus,
            newOrderStatus,
            checkAfter,
            branchID: String(branch.id),
            enabled,
            updateAt: Number(updateAt),
            returnCondition: returnCondition || "UNKNOWN"
        }
    });

    const {
        data: branches = {
            data: []
        }
    } = useBranches({
        size: 100000,
        minified: true,
        governorate: form.values.governorate as keyof typeof governorateArabicNames
    });

    const { mutate: editDate, isLoading } = useEditAutomaticUpdateTimer();

    const handleSubmit = (values: z.infer<typeof orderStatusAutomaticUpdateCreateSchema>) => {
        if (values.checkAfter === 0) {
            form.setFieldError("checkAfter", "لا يمكن ان يكون الموعد صفر");
            return;
        }
        editDate(
            {
                id,
                data: {
                    checkAfter: values.checkAfter,
                    branchID: Number(values.branchID),
                    governorate: values.governorate as CreateAutomaticUpdateDatePayload["governorate"],
                    orderStatus: values.orderStatus as CreateAutomaticUpdateDatePayload["orderStatus"],
                    newOrderStatus: values.newOrderStatus as CreateAutomaticUpdateDatePayload["orderStatus"],
                    updateAt: values.updateAt,
                    enabled: values.enabled,
                    returnCondition:
                        values.returnCondition === "UNKNOWN"
                            ? undefined
                            : (values.returnCondition as CreateAutomaticUpdateDatePayload["returnCondition"])
                }
            },
            {
                onSuccess: () => {
                    close();
                }
            }
        );
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="تعديل موعد تحديث الطلبات" centered>
                <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
                    <Select
                        data={governorateArray}
                        label="اختر المحافظة"
                        placeholder="اختر المحافظة"
                        clearable
                        searchable
                        {...form.getInputProps("governorate")}
                    />
                    <Select
                        label="الفرع"
                        searchable
                        placeholder="اختر الفرع"
                        {...form.getInputProps("branchID")}
                        limit={100}
                        data={getSelectOptions(branches.data)}
                    />
                    <Select
                        data={orderStatusArray}
                        label="اختر حالة الطلب"
                        placeholder="اختر حالة الطلب"
                        clearable
                        searchable
                        {...form.getInputProps("orderStatus")}
                    />
                    <Select
                        data={orderStatusArray.filter((item) => item.value !== form.values.orderStatus)}
                        description="يجب اختيار حالة الطلب اولاً"
                        disabled={!form.values.orderStatus}
                        label="اختر حالة الطلب الجديدة"
                        placeholder="اختر حالة الطلب الجديدة"
                        clearable
                        searchable
                        {...form.getInputProps("newOrderStatus")}
                    />
                    <NumberInput
                        label="القيمة (بالساعة)"
                        placeholder="القيمة (بالساعة)"
                        allowNegative={false}
                        allowDecimal={false}
                        {...form.getInputProps("checkAfter")}
                    />
                    <NumberInput
                        label="يوميا علي الساعة"
                        placeholder="يوميا علي الساعة (24 ساعة)"
                        allowNegative={false}
                        allowDecimal={false}
                        clampBehavior="strict"
                        max={24}
                        {...form.getInputProps("updateAt")}
                    />
                    <Switch label="تفعيل" {...form.getInputProps("enabled")} defaultChecked={enabled} />
                    <Radio.Group
                        name="orderReturnCondition"
                        label="اختر حالة الارجاع"
                        withAsterisk
                        {...form.getInputProps("returnCondition")}
                    >
                        <div className="flex items-center gap-4">
                            {orderReturnConditionArray.map((item) => (
                                <Radio key={item.value} value={item.value} label={item.label} />
                            ))}
                            <Radio value="UNKNOWN" label="غير محدد" />
                        </div>
                    </Radio.Group>
                    <div className="flex items-center gap-4">
                        <Button loading={isLoading} disabled={isLoading} type="submit">
                            تعديل
                        </Button>
                        <Button type="reset" onClick={close} variant="outline">
                            الغاء
                        </Button>
                    </div>
                </form>
            </Modal>

            <ActionIcon
                onClick={() => {
                    open();
                }}
                variant="filled"
            >
                <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
        </>
    );
};
