const errorHandler = (err, req, res, next) => {
    const errCode = err.statusCode || 500;
    const msg = errCode === 500 ? "Internal Server error" : err.message;

    res.status(errCode).json({
        success: false,
        error: {
            code: errCode,
            message: msg,
        }
    })


};

export default errorHandler;