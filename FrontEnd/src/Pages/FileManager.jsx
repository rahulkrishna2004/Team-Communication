import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../Axios/axiosInstance";
import FileItem from "../Components/FileItem";
import { Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FileManager = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  // 🧩 Load user + token setup
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setCurrentUser(user);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }, [navigate]);

  // 🧩 Trigger file picker
  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  // 🧩 Upload file when selected
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(0);

      await axiosInstance.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });

      alert("File uploaded successfully ✅");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("File upload failed ❌");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = ""; // reset input
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Upload className="text-blue-600" /> File Manager
          </h1>
        </div>

        {/* Upload + Icon */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSelectFile}
            disabled={uploading}
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all duration-200 ${
              uploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Plus size={32} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* File List (Static / placeholder) */}
        <div className="space-y-3">
          {files.length > 0 ? (
            files.map((file) => <FileItem key={file._id} file={file} />)
          ) : (
            <p className="text-gray-400 text-center">
              Files are uploaded successfully but listing not enabled yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
