import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { parseResume } from '../utils/parser.js';

const upload = multer({ dest: path.join(process.cwd(), 'server', 'uploads') });

export const uploadResume = [
  upload.single('resume'),
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ message: 'Resume file is required' });

      const parsed = await parseResume(file.path);
      setTimeout(() => {
        fs.unlink(file.path, () => {});
      }, 30000);
      res.json({ url: `/uploads/${file.filename}`, parsed });
    } catch (error) {
      next(error);
    }
  }
];
