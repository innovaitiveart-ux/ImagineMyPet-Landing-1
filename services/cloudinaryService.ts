//REDEPLOY TEST
import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// ✅ Uploads base64 image to Cloudinary using unsigned preset
export async function uploadToCloudinary(imageBase64: string) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Missing Cloudinary config in .env.local");
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  try {
    const fileData = `data:image/jpeg;base64,${imageBase64}`;
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(uploadUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Cloudinary upload successful:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error: any) {
    console.error("❌ Cloudinary upload failed:", error.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
}
