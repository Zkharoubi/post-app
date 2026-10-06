class AppError extends Error {
    constructor(code, message) {
        super(typeof message === "string" ? message : "Validation error")
        this.code = code
        this.details = message
    }

}
module.exports = AppError