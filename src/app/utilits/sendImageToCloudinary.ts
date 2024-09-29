import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'



cloudinary.config({
    cloud_name: 'djt6bowuz',
    api_key: '224485766351415',
    api_secret: 'qZUMjfxnbg0OOFWcAF01r2r_4bc'
});


// export const sendImageToCloudinary = async (name: string, filePath: string) => {
//     try {
//         const result = await cloudinary.uploader.upload(filePath, {
//             public_id: name
//         });

//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error(`Failed to delete file: ${filePath}`, err);
//             } else {
//                 console.log(`Successfully deleted file: ${filePath}`);
//             }
//         });
//         console.log(result);
//         return result.url;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }


// };

// const uploadsDirectory = path.join('C:', 'Users', 'user', 'Desktop', 'projects', 'car-rental-service-assignment', 'src', 'uploads');

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadsDirectory);
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
// });

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadMiddleware = (req: any, res: any, next: any) => {

    // Use multer upload instance
    upload.array('files', 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Retrieve uploaded files
        const files = req.files;
        const errors: string[] = [];

        // Validate file types and sizes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        files.forEach((file: any) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });

        // // Handle validation errors
        // if (errors.length > 0) {
        //     // Remove uploaded files
        //     files.forEach((file: any) => {
        //         fs.unlinkSync(file.path);
        //     });

        //     return res.status(400).json({ errors });
        // }


        req.files = files;


        next();
    });
};

export default uploadMiddleware