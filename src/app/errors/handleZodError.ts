
import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
    const statusCode = 400
    const errorSources = err?.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message
        }

    })
    return {
        errorSources,
        statusCode,
        message: 'Zod Validation Error'
    }
}

export default handleZodError