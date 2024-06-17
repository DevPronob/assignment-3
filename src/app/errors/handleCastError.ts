import mongoose from "mongoose";
import { TGenericErrorType } from "../interface/error";


const handleCastError = (err: mongoose.Error.CastError): TGenericErrorType => {
    const statusCode = 500
    const errorSources = [
        {
            path: err?.path,
            message: err?.message
        }
    ]
    return {
        statusCode,
        errorSources,
        message: "Invalid Id"
    }
}

export default handleCastError