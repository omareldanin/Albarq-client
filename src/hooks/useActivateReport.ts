import { activateReportService } from "@/services/activateReport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useActivateReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => activateReportService({ id }),
        onSuccess: () => {
            toast.success("تم تفعيل استعادة الكشف بنجاح");
            queryClient.invalidateQueries(["reports"]);
        }
    });
};
