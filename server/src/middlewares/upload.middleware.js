import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'mp3') {
            cb(null, 'uploads/mp3/');
        } else if (file.fieldname === 'cover') {
            cb(null, 'uploads/covers/');
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, ext);
        const newFilename = `${originalName}${ext}`;
        cb(null, newFilename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'mp3' && file.mimetype === 'audio/mpeg') {
        cb(null, true);
    } else if (file.fieldname === 'cover' && file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Файл не підтримується'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

export default upload;