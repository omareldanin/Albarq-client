import { AppLayout } from "@/components/AppLayout";
import { ImageUploader } from "@/components/CustomDropZone";
import { useBranches } from "@/hooks/useBranches";
import { useEmployeeDetails } from "@/hooks/useEmployeeDetails";
import { useRepositories } from "@/hooks/useRepositories";
import { useTenants } from "@/hooks/useTenants";
import { getSelectOptions } from "@/lib/getSelectOptions";
import { permissionsArray } from "@/lib/persmissionArabicNames";
import { rolesArray } from "@/lib/rolesArabicNames";
import type { APIError } from "@/models";
import { createEmployeeService } from "@/services/createEmployee";
import { useAuth } from "@/store/authStore";
import { Button, Grid, MultiSelect, PasswordInput, Select, TextInput } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { addEmployeeSchema } from "./schema";
import { orderStatusArray } from "@/lib/orderStatusArabicNames";

export const AddEmployee = () => {
    const navigate = useNavigate();
    const { role, id: loggedInUserId, companyID: loggedInCompanyId } = useAuth();
    const isAdminOrAdminAssistant = role === "ADMIN" || role === "ADMIN_ASSISTANT";
    const isBranchManager = role === "BRANCH_MANAGER";
    const {
        data: employeeDetails,
        isLoading: isFetchingBranchManagerDetailsLoading,
        isError: isFetchingBranchManagerDetailsError
    } = useEmployeeDetails(Number(loggedInUserId), !isAdminOrAdminAssistant);
    const { data: branches = { data: [] } } = useBranches({
        size: 100000,
        minified: true
    });
    const { data: repositories = { data: [] } } = useRepositories({
        size: 100000,
        minified: true
    });
    const { data: tenants = { data: [] } } = useTenants(
        { size: 100000, minified: true },
        isAdminOrAdminAssistant
    );
    const form = useForm({
        validate: zodResolver(addEmployeeSchema),
        initialValues: {
            username: "",
            name: "",
            phone: "",
            branch: "",
            store: "",
            roles: "",
            permissions: [],
            orderStatus: [],
            password: "",
            confirmPassword: "",
            companyID: "",
            avatar: [] as unknown as FileWithPath[],
            idCard: [] as unknown as FileWithPath[],
            residencyCard: [] as unknown as FileWithPath[]
        }
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (employeeDetails) {
            form.setFieldValue("companyID", employeeDetails?.data?.company?.id.toString());
            form.setFieldValue("branch", employeeDetails?.data.branch?.id.toString() || "");
        }

        if (isBranchManager) {
            form.setFieldValue("roles", "DELIVERY_AGENT");

            form.setFieldValue("permissions", [
                "CHANGE_ORDER_STATUS",
                "CHANGE_ORDER_TOTAL_AMOUNT",
                "CHANGE_ORDER_DATA"
            ] as never);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employeeDetails, isBranchManager]);

    const queryClient = useQueryClient();
    const { mutate: createBranchAction, isLoading } = useMutation({
        mutationFn: (data: FormData) => {
            return createEmployeeService(data);
        },
        onSuccess: () => {
            toast.success("تم اضافة الموظف بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            });
            form.resetDirty();
        },
        onError: (error: AxiosError<APIError>) => {
            toast.error(error.response?.data.message || "حدث خطأ ما");
        }
    });

    const handleSubmit = (values: z.infer<typeof addEmployeeSchema>) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("username", values.phone);
        formData.append("phone", values.phone);
        formData.append("branchID", values.branch);
        formData.append("repositoryID", values.store);
        formData.append("role", values.roles);
        formData.append("password", values.password);
        formData.append("avatar", values.avatar[0]);
        formData.append("idCard", values.idCard[0]);
        formData.append("residencyCard", values.residencyCard[0]);
        // TODO: DELETE THE SALARY LATER
        formData.append("salary", "220");
        if (isAdminOrAdminAssistant) {
            formData.append("companyID", values.companyID);
        } else {
            formData.append("companyID", loggedInCompanyId.toString());
        }
        formData.append("permissions", JSON.stringify(values.permissions));
        if(values.orderStatus.length > 0){
            formData.append("orderStatus", JSON.stringify(values.orderStatus));
        }
        
        createBranchAction(formData);
    };

    const handleReturn = () => {
        if (role === "BRANCH_MANAGER") {
            navigate(-1);
            return;
        }
        navigate("/employees");
    };

    return (
        <AppLayout
            isLoading={isBranchManager && isFetchingBranchManagerDetailsLoading}
            isError={isBranchManager && isFetchingBranchManagerDetailsError}
        >
            <div className="flex items-center gap-4">
                <ChevronRight size={34} className="mt-2 cursor-pointer" onClick={handleReturn} />
                <h1 className="text-3xl font-semibold">اضافة موظف</h1>
            </div>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <TextInput
                            label="الاسم"
                            placeholder=""
                            size="md"
                            className="w-full"
                            {...form.getInputProps("name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <TextInput
                            label="رقم الهاتف"
                            placeholder=""
                            size="md"
                            className="w-full"
                            {...form.getInputProps("phone")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        {isBranchManager ? (
                            <Select
                                searchable
                                label="الفرع"
                                placeholder="اختار الفرع"
                                readOnly
                                data={getSelectOptions(branches.data || [])}
                                limit={100}
                                value={employeeDetails?.data.branch.id.toString()}
                            />
                        ) : (
                            <Select
                                searchable
                                label="الفرع"
                                placeholder="اختار الفرع"
                                data={getSelectOptions(branches.data || [])}
                                limit={100}
                                {...form.getInputProps("branch")}
                            />
                        )}
                    </Grid.Col>
                    {!isBranchManager && (
                        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                            <Select
                                searchable
                                label="المخزن"
                                placeholder="اختار المخزن"
                                data={getSelectOptions(repositories.data || [])}
                                limit={100}
                                {...form.getInputProps("store")}
                            />
                        </Grid.Col>
                    )}
                    {isAdminOrAdminAssistant && (
                        <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                            <Select
                                searchable
                                label="الشركة"
                                placeholder="اختار الشركة"
                                data={getSelectOptions(tenants.data || [])}
                                limit={100}
                                {...form.getInputProps("companyID")}
                            />
                        </Grid.Col>
                    )}
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        {isBranchManager ? (
                            <Select
                                label="الادوار"
                                placeholder="اختار الادوار"
                                value="DELIVERY_AGENT"
                                disabled
                                data={rolesArray.filter(
                                    (role) => role.value !== "ADMIN" && role.value !== "ADMIN_ASSISTANT"
                                )}
                            />
                        ) : (
                            <Select
                                label="الادوار"
                                placeholder="اختار الادوار"
                                data={rolesArray.filter(
                                    (role) => role.value !== "ADMIN" && role.value !== "ADMIN_ASSISTANT"
                                )}
                                {...form.getInputProps("roles")}
                            />
                        )}
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <MultiSelect
                            label="الصلاحيات"
                            placeholder="اختار الصلاحيات"
                            // readOnly={isBranchManager}
                            data={permissionsArray}
                            {...form.getInputProps("permissions")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <MultiSelect
                            label="الحالات"
                            placeholder="اختار الحالات"
                            // readOnly={isBranchManager}
                            data={orderStatusArray}
                            {...form.getInputProps("orderStatus")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12, xs: 12 }}>
                        <h1 className="text-2xl font-semibold text-center mb-2">الصورة الشخصية</h1>
                        <ImageUploader
                            image={form.values.avatar}
                            onDrop={(files) => {
                                form.setFieldValue("avatar", files);
                            }}
                            onDelete={() => {
                                form.setFieldValue("avatar", []);
                            }}
                            error={!!form.errors.avatar}
                        />
                        {form.errors.avatar && <div className="text-red-500">{form.errors.avatar}</div>}
                        <h1 className="text-2xl font-semibold text-center mb-2">الهوية</h1>
                        <ImageUploader
                            image={form.values.idCard}
                            onDrop={(files) => {
                                form.setFieldValue("idCard", files);
                            }}
                            onDelete={() => {
                                form.setFieldValue("idCard", []);
                            }}
                            error={!!form.errors.idCard}
                        />
                        {form.errors.idCard && <div className="text-red-500">{form.errors.idCard}</div>}
                        <h1 className="text-2xl font-semibold text-center mb-2">الإقامة</h1>
                        <ImageUploader
                            image={form.values.residencyCard}
                            onDrop={(files) => {
                                form.setFieldValue("residencyCard", files);
                            }}
                            onDelete={() => {
                                form.setFieldValue("residencyCard", []);
                            }}
                            error={!!form.errors.residencyCard}
                        />
                        {form.errors.residencyCard && (
                            <div className="text-red-500">{form.errors.residencyCard}</div>
                        )}
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <PasswordInput
                            label="كلمة المرور"
                            placeholder="*******"
                            mt="md"
                            size="md"
                            className="w-full"
                            {...form.getInputProps("password")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <PasswordInput
                            label="تأكيد كلمة المرور"
                            placeholder="*******"
                            mt="md"
                            size="md"
                            className="w-full"
                            {...form.getInputProps("confirmPassword")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <Button loading={isLoading} type="submit" fullWidth mt="xl" size="md">
                            اضافة
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6, sm: 12, xs: 12 }}>
                        <Button
                            type="reset"
                            fullWidth
                            mt="xl"
                            size="md"
                            variant="outline"
                            onClick={() => {
                                form.reset();
                                navigate("/employees");
                            }}
                        >
                            الغاء
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </AppLayout>
    );
};
