import { Response } from "express"
import httpStatus from "http-status"

const sendResponse = <T>(res: Response, data: {
    statusCode: number,
    success: boolean,
    message: string,
    data: T
}) => {
    console.log(data)
    if (data.data && Array.isArray(data.data) ? data.data.length > 0 : true) {
        return res.status(data?.statusCode).json({
            success: data.success,
            message: data.message,
            data: data.data,
        })
    }
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'No Data Found',
        data: [],
    })
}

export default sendResponse
