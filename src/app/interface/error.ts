export type TErrorSoutces = {
    path: string | number,
    message: string
}[];

export type TGenericErrorType = {
    statusCode: number,
    message: string,
    errorSources: TErrorSoutces

}