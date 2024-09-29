/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { Booking } from "../booking/booking.model";
import totalCost from "./car.utils";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { v2 as cloudinary } from 'cloudinary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-undef
const createCarIntoDB = async (payload: any, file: any) => {
    try {

        const imageUrlList = await Promise.all(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            file.map((file: any, i: string) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            public_id: `${Math.floor(Math.random() * 1000)}_${payload.name}_${i}`,
                        },
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(result?.secure_url);
                        }
                    );
                    uploadStream.end(file.buffer);
                });
            })
        );

        console.log('Uploaded files:', imageUrlList); // Image URLs

        // Create the car data with the uploaded image URLs
        const carData = {
            ...payload,
            images: imageUrlList,
        };

        const result = await Car.create(carData);

        return result;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw new Error('Failed to upload images');
    }
};

const getCarsFromDB = async (query: Record<string, unknown>) => {

    //getting all cars
    const carQuery = await new QueryBuilder(Car.find(), query).search(['name', 'description']).filter().sort().paginate()
    const result = carQuery.modelQuery
    return result
};
const getSingleCarFromDB = async (id: string) => {

    //getting single car with id
    const result = await Car.findById(id)
    return result
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const upddateSingleCarIntoDB = async (id: string, payload: Partial<TCar>, file: any) => {
    console.log(payload, file, "payload")

    const isCarExits = await Car.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not exits")


    }
    const imageUrlList = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        file.map((file: any, i: string) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: `${Math.floor(Math.random() * 1000)}_${payload.name}_${i}`,
                    },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result?.secure_url);
                    }
                );
                uploadStream.end(file.buffer);
            });
        })
    );

    console.log('Uploaded files:', imageUrlList); // Image URLs
    const carData = {
        ...payload,
        images: imageUrlList
    }
    console.log(carData, "updateCar Data")

    const result = await Car.findByIdAndUpdate(id, carData, {
        new: true,
        runValidators: true
    })
    return result
};

const deleteSingleCarIntoDB = async (id: string) => {
    //soft deletting car with id
    const isCarExits = await Car.findById(id)
    if (!isCarExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Car is not exits")
    }

    const result = await Car.findOneAndDelete({ _id: id })
    console.log('deleteCar', result)
    return result
};

const returnCarIntoDB = async (payload: { bookingId: string, endTime: string }) => {
    //returing car by adding total and end time
    const booking = await Booking.findById(payload.bookingId)
    console.log(booking, "booking")
    const startTime = booking?.startTime
    const resTotal = totalCost(startTime, payload.endTime, booking?.costWithFeature) //total cost getting by this 
    const result = await Booking.findOneAndUpdate(
        { _id: payload.bookingId },
        {
            endTime: payload.endTime,
            totalCost: resTotal,
            returnCar: true
        },
        { new: true }
    )

    return result
};




export const CarServices = {
    createCarIntoDB,
    getCarsFromDB,
    getSingleCarFromDB,
    upddateSingleCarIntoDB,
    deleteSingleCarIntoDB,
    returnCarIntoDB
}


// import multer from 'multer';
// import cloudinary from 'cloudinary'; // Ensure you have Cloudinary SDK setup

// // Set up multer for in-memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.post('/upload', upload.array('files'), async (req, res) => {
//     const files = req.files as Express.Multer.File[];
//     const payload = req.body;

//     let imageUrlList = [];

//     // Loop through files and upload each one to Cloudinary
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];

//         // Upload file buffer to Cloudinary (in-memory)
//         await new Promise((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 {
//                     public_id: `${Math.floor(Math.random() * 1000)}_${payload.name}_${i}`,
//                 },
//                 (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     imageUrlList.push(result?.secure_url);
//                     resolve(result);
//                 }
//             );
//             uploadStream.end(file.buffer); // Upload from memory buffer
//         });
//     }

//     // Return uploaded image URLs to the client
//     res.status(200).json({
//         message: 'Upload successful',
//         images: imageUrlList,
//     });
// });
