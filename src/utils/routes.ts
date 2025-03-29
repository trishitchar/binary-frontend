import axiosInstance from "./axiosInstance";

export const summarizeText = async (text:string): Promise<any> => {
    try {
        const response = await axiosInstance.post("/ai/summarize", {text});
        return response.data;
    } catch (error) {
        console.error("Error summarizing text:", error);
        throw error;
    }
};
