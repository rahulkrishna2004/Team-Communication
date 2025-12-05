import React from "react";
import { Download } from "lucide-react";
import axiosInstance from "../Axios/axiosInstance";

const FileItem = ({ file }) => {
  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(`/files/${file._id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a"); 
      link.href = url;
      link.setAttribute("download", file.originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3 border">
      <div>
        <p className="font-semibold text-gray-800">{file.originalName}</p>
        <p className="text-xs text-gray-500">
          Uploaded on {new Date(file.createdAt).toLocaleString()}
        </p>
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg"
      >
        <Download size={16} /> Download
      </button>
    </div>
  );
};

export default FileItem;
