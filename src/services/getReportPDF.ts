import { api } from "@/api";
import { AxiosError } from "axios";
import FileSaver from "file-saver";

export const getReportPDFService = async (reportID: number, name: string) => {
    try {
        const response = await api.get(`/reports/${reportID}/pdf`, {
            responseType: "arraybuffer"
        });

        const contentType = response.headers["content-type"];

        if (contentType === "application/pdf") {
            const blob = new Blob([response.data], { type: "application/pdf" });
            FileSaver.saveAs(blob, `${name}.pdf`);
            return;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            const data = JSON.parse(new TextDecoder().decode(error.response?.data));
            throw data;
        }
    }
};
