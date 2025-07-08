import path from 'path';
import fs from 'fs';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import type { Request } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

// Ensure upload directory exists
// const uploadPath = path.join(__dirname, '../../uploads/pitchdecks');
// if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
//   if (file.mimetype.includes('pdf') || file.mimetype.includes('presentation') || file.mimetype.includes('vnd.openxmlformats-officedocument')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF or presentation files are allowed'), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });

// AWS S3 configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const s3Bucket = process.env.AWS_S3_BUCKET_NAME!;
const imageStorage = multerS3({
  s3: s3,
  bucket: s3Bucket,
  // acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) => {
    const uniqueName = `image/${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, SVG, WEBP files are allowed'));
  }
};

// Document file filter
const documentFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, PPT, DOCX, XLSX files are allowed'));
  }
};

// S3 storage for documents
const documentStorage = multerS3({
  s3: s3,
  bucket: s3Bucket,
  // acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) => {
    const uniqueName = `docs/${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const uploadImage = multer({ storage: imageStorage, fileFilter: imageFileFilter });
export const uploadDocument = multer({ storage: documentStorage, fileFilter: documentFileFilter });

// Combined storage engine for both images and documents
const combinedStorage = {
  _handleFile(req: Request, file: Express.Multer.File, cb: any) {
    const isImage = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'].includes(file.mimetype);
    const isDocument = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ].includes(file.mimetype);
    if (isImage) {
      imageStorage._handleFile(req, file, cb);
    } else if (isDocument) {
      documentStorage._handleFile(req, file, cb);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
  _removeFile(req: Request, file: Express.Multer.File, cb: any) {
    if (file.fieldname === 'featuredImage') {
      imageStorage._removeFile(req, file, cb);
    } else if (file.fieldname === 'documents') {
      documentStorage._removeFile(req, file, cb);
    } else {
      cb(null);
    }
  }
};

const combinedFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === 'image') {
    imageFileFilter(req, file, cb);
  } else if (file.fieldname === 'documents') {
    documentFileFilter(req, file, cb);
  } else {
    cb(new Error('Unexpected field'));
  }
};

// export const uploadPressRelease = multer({ storage: combinedStorage as any, fileFilter: combinedFileFilter });

export const upload = {
  image: uploadImage,
  document: uploadDocument
}