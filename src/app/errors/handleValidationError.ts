import mongoose from "mongoose";
import { TGenericErrorType } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorType => {
    const statusCode = 400
    const errorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message,
        }
    })
    return {
        errorSources,
        statusCode,
        message: 'Mongoose Validation Error'
    }

}

export default handleValidationError