// import { isValidIraqiPhoneNumber } from '@/lib/testIraqiPhoneNumber';
import { z } from "zod";

export const addEmployeeSchema = z
    .object({
        name: z.string().min(3, { message: "الاسم يجب ان يكون اكثر من 3 احرف" }),
        phone: z.string().min(6, { message: "رقم الهاتف يجب ان يكون 6 ارقام على الأقل" }),
        avatar: z.any(),
        idCard: z.array(z.any()).min(1, { message: "الهوية مطلوبة" }),
        residencyCard: z.array(z.any()).min(1, { message: "الإقامة مطلوبة" }),
        branch: z.string().min(1, { message: "الرجاء اختيار الفرع" }),
        companyID: z.string().min(1, { message: "الرجاء اختيار الشركة" }),
        store: z.string(),
        roles: z
            .string({
                required_error: "الرجاء اختيار الادوار"
            })

            .min(1, { message: "الرجاء اختيار الادوار" }),
        permissions: z.array(z.string({ required_error: "الرجاء اختيار الصلاحيات" })),
        orderStatus: z.array(z.string({ required_error: "الرجاء اختيار الصلاحيات" })),
        password: z.string().min(6, { message: "كلمة المرور يجب ان تكون 6 احرف" }),
        confirmPassword: z.string().min(6, { message: "كلمة المرور يجب ان تكون 6 احرف" })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "كلمة المرور غير متطابقة",
        path: ["confirmPassword"]
    });
