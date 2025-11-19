/*
Routing and functionality for file uploads. Expecting media related to Item.

TODOs:
Create controller for functionality.
Include upload functionality as part of form handling.
Log file info for serving later.
*/
import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { smartLogging } from '../common/SmartLogging';

const logger = new smartLogging('uploadRouter', true);
logger.log('init', `routing setup`);

export function createUploadRoutes() {
    const router = express.Router();

    // Helper: sanitize file names to avoid path traversal
    function sanitizeFileName(filename: string): string {
        return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    }

    // Directory for saving uploaded files
    const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

    // Ensure the upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Multer setup (no memory storage — just stream handling)
    const upload = multer({
        storage: multer.memoryStorage(), // We'll manually stream to disk later
        limits: {
            fileSize: 500 * 1024 * 1024 // 500MB max (adjust as needed)
        }
    });

    /**
     * POST /api/upload
     * Streams uploaded file chunks to local disk.
     */
    router.post(
        '/media',
        upload.single('file'),
        async (req: Request, res: Response): Promise<void> => {
            try {
                logger.log('POST /media', `start`);

                if (!req.file) {
                    res.status(400).json({ error: 'No file uploaded' });
                    logger.error(`file not uploaded`);
                    return;
                }

                logger.log('POST /media', `file found`);

                const { originalname, buffer, mimetype } = req.file;
                const safeName = sanitizeFileName(originalname);
                const outputPath = path.join(UPLOAD_DIR, safeName);

                logger.log('POST /media', `outputPath: ${outputPath}`);
                logger.log('POST /media', `readStream complete`);

                // But since Multer gives a Buffer, we can wrap it as a stream manually
                const { Readable } = await import('stream');
                const fileStream = Readable.from(buffer);

                // Stream file buffer to disk
                const writeStream = fs.createWriteStream(outputPath);

                logger.log('POST /media', `writeStream complete`);

                const pump = promisify(pipeline);
                await pump(fileStream, writeStream);

                logger.log('POST /media', `pump complete`);

                res.status(200).json({
                    success: true,
                    message: 'File uploaded successfully',
                    file: {
                        name: safeName,
                        type: mimetype,
                        size: req.file.size
                    }
                });
            } catch (err: any) {
                console.error('Upload error:', err);
                res.status(500).json({ error: 'Failed to upload file' });
            }
        }
    );

    return router;
}
