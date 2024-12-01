import * as zod from "zod";

export const BannerSchema = zod.object({
    title: zod
        .string({
            required_error: "مطلوب"
        })
        .min(3, "يجب ان يكون اكثر من 3 احرف"),
    content: zod
        .string({
            required_error: "مطلوب"
        })
        .min(3, "يجب ان يكون اكثر من 3 احرف"),
    image: zod.any(),
    url: zod
        .string({
            required_error: "مطلوب"
        })
        .url("يجب ان يكون رابط صحيح")
});
