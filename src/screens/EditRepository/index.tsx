import { AppLayout } from "@/components/AppLayout";
import { useBranches } from "@/hooks/useBranches";
import { useRepositoryDetails } from "@/hooks/useRepositoryDetails";
import type { APIError } from "@/models";
import { type EditRepositoryPayload, editRepositoryService } from "@/services/editRepositoryService";
import { Autocomplete, Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import type { z } from "zod";
import { editRepositorySchema } from "./schema";

export const EditRepositoryScreen = () => {
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const { data: repositoryDetails, isLoading, isError } = useRepositoryDetails(Number.parseInt(id));
    const { data: branches } = useBranches({
        size: 100000,
        minified: true
    });
    const form = useForm({
        validate: zodResolver(editRepositorySchema),
        initialValues: {
            name: "",
            branch: ""
        }
    });

    useEffect(() => {
        form.setValues({
            name: repositoryDetails?.data?.name,
            branch: repositoryDetails?.data?.branch.name
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repositoryDetails]);
    const queryClient = useQueryClient();
    const { mutate: editRepositoryAction, isLoading: isEditing } = useMutation({
        mutationFn: ({ branchID, name }: EditRepositoryPayload) => {
            return editRepositoryService({
                data: { branchID, name },
                id: Number.parseInt(id)
            });
        },
        onSuccess: () => {
            toast.success("تم تعديل المخزن بنجاح");
            navigate("/repositories");
            queryClient.invalidateQueries({
                queryKey: ["repositories"]
            });
        },
        onError: (error: AxiosError<APIError>) => {
            toast.error(error.response?.data.message || "حدث خطأ ما");
        }
    });

    const transformedBranches = branches?.data?.map((branch) => ({
        value: branch.id.toString(),
        label: branch.name
    }));

    const handleSubmit = (values: z.infer<typeof editRepositorySchema>) => {
        const transformedBranch = transformedBranches?.find((branch) => branch.label === values.branch);
        if (!transformedBranch) {
            form.setFieldError("location", "المحافظة غير موجودة");
            return;
        }
        editRepositoryAction({
            name: values.name,
            branchID: Number.parseInt(transformedBranch.value)
        });
    };

    return (
        <AppLayout isLoading={isLoading} isError={isError}>
            <div className="flex items-center gap-4">
                <ChevronRight
                    size={34}
                    className="mt-2 cursor-pointer"
                    onClick={() => {
                        navigate("/repositories");
                    }}
                />
                <h1 className="text-3xl font-semibold">تعديل مخزن</h1>
            </div>
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
            >
                <TextInput
                    label="الاسم"
                    placeholder=""
                    size="md"
                    className="w-full"
                    {...form.getInputProps("name")}
                />
                <Autocomplete
                    label="الفرع"
                    placeholder="اختار الفرع"
                    data={transformedBranches}
                    limit={100}
                    {...form.getInputProps("branch")}
                />
                <Button
                    loading={isEditing}
                    type="submit"
                    fullWidth
                    mt="xl"
                    size="md"
                    disabled={isEditing || !form.isDirty}
                >
                    تعديل
                </Button>
                <Button
                    type="reset"
                    fullWidth
                    mt="xl"
                    size="md"
                    variant="outline"
                    onClick={() => {
                        navigate("/repositories");
                    }}
                >
                    الغاء
                </Button>
            </form>
        </AppLayout>
    );
};
