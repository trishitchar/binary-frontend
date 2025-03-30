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

export const uploadPdf = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosInstance.post("/pdf/to-text", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        // const response = await new Promise<{ data: { text: string } }>((resolve) => {
        //     setTimeout(() => {
        //         resolve({
        //             data: {
        //                 text: "This is a dummy response from the server.",
        //             },
        //         });
        //     }, 2000);
        // });
        return response.data;
    } catch (error) {
        console.error("Error uploading PDF:", error);
        throw error;
    }
}
