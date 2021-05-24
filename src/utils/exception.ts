export class HttpException extends Error {
    errors?: any;
    statusCode: number;

    constructor(message: string, statusCode: number, errors?: any) {
        super(errors);
        this.message = message;
        this.errors = errors;
        this.statusCode = statusCode;
    }
}