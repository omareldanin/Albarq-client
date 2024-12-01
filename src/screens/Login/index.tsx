// import Logo from "@/assets/auth-image.png";
import { getLoginMetadata, type LoginMetadata } from "@/lib/getLoginMetadata";
import type { APIError } from "@/models";
import { signInService, type SignInRequest } from "@/services/signInService";
import { useAuth } from "@/store/authStore";
import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
    username: z.string().min(3, { message: "يجب ان يكون اكثر من 3 احرف" }),
    password: z.string().min(6, { message: "كلمة المرور يجب ان تكون اكثر من 6 احرف" })
});

export const LoginScreen = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // const [geolocationGranted, setGeolocationGranted] = useState<boolean>(false);
    const [loginMetadata, setLoginMetadata] = useState<LoginMetadata | undefined>(undefined);

    useEffect(() => {
        getLoginMetadata().then((data) => {
            setLoginMetadata(data);
        });
    }, []);

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ password, username, ...loginMetadata }: SignInRequest) => {
            return signInService({ password, username, ...loginMetadata });
        },
        onSuccess: (data) => {
            toast.success("تم تسجيل الدخول بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["validateToken"]
            });
            navigate("/orders");
            setAuth(data);
        },
        onError: (error: AxiosError<APIError>) => {
            toast.error(error.response?.data.message || "حدث خطأ ما");
        }
    });
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            username: "",
            password: ""
        }
    });

    // const isLocationPermissionGranted = async () => {
    //     const isLocationPermissionGranted = await navigator.permissions.query({
    //         name: "geolocation"
    //     });
    //     return isLocationPermissionGranted;
    // };

    const handleSubmit = async (values: z.infer<typeof schema>) => {
        if (!loginMetadata) {
            toast.error("حدث خطأ ما في الحصول على الموقع");
            return;
        }

        const performLogin = () => {
            login({ password: values.password, username: values.username, ...loginMetadata });
        };

        performLogin();

        // if (!geolocationGranted) {
        //     toast.error("يجب تفعيل صلاحية الموقع للمتابعة");
        //     return;
        // }

        // await isLocationPermissionGranted().then(({ state }) => {
        //     if (state === "denied") {
        //         toast.error("يجب تفعيل صلاحية الموقع للمتابعة");
        //         return;
        //     }

        //     if (state === "prompt") {
        //         navigator.geolocation.getCurrentPosition(performLogin);
        //         return;
        //     }

        //     if (state === "granted") {
        //         performLogin();
        //     }
        // });
    };

    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                // onSubmit={form.onSubmit(async () => console.log(await getLoginMetadata()))}
                className="flex flex-col justify-center items-center px-10 bg-background border-l border-border"
            >
                <Title order={2} ta="center" mt="md" mb={50}>
                    مرحبا بك لوحة التحكم!
                </Title>

                <TextInput
                    label="رقم الهاتف"
                    placeholder=""
                    size="md"
                    className="w-full"
                    {...form.getInputProps("username")}
                />
                <PasswordInput
                    label="كلمة المرور"
                    placeholder=""
                    mt="md"
                    size="md"
                    className="w-full"
                    {...form.getInputProps("password")}
                />
                <Button loading={isLoading} type="submit" fullWidth mt="xl" size="md">
                    تسجيل الدخول
                </Button>
            </form>
            {/* <img
                src={Logo}
                alt="logo"
                className="hidden md:block h-full object-contain md:col-span-1 lg:col-span-2 aspect-auto"
            /> */}
        </div>
    );
};
