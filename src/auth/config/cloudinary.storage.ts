import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'products', // Folder in Cloudinary
    format: path.extname(file.originalname).substring(1) || 'png', // Ensure a valid format
    resource_type: 'auto', // Allow automatic detection of file type
    transformation: [{ width: 500, height: 500, crop: 'limit' }], // Resize images
  }),
});
