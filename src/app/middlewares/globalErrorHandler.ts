import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { TErrorSoutces } from "../interface/error";
import handleDuplicateError from "../errors/handleDuplicate";
import handleValidationError from "../errors/handleValidationError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";
import config from "../config";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong!';

    let errorSources: TErrorSoutces = [
        {
            path: "",
            message: 'Something went wrong!'
        }
    ];

    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);

        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err instanceof AppError) {

        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err.stack : null,
    });
}
export default globalErrorHandler;
