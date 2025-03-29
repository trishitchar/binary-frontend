import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Show image preview if the file is an image
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await axiosInstance.post("/upload", formData);
      setMessage(`File uploaded successfully: ${response.data.fileUrl}`);
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto bg-white">
      <h2 className="text-lg font-semibold mb-2">Upload a PDF or Image</h2>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="mb-2"
      />

      {preview && (
        <img src={preview} alt="Preview" className="w-full h-32 object-cover mb-2 border rounded-md" />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full p-2 text-white rounded-md ${
          uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-2 text-sm text-center">{message}</p>}
    </div>
  );
};

export default FileUpload;
