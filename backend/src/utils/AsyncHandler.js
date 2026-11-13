const asyncHandler = (controller) => {
    return (req, res, next) => {
        // TODO 1: Execute the controller using
        // req, res, and next

        // TODO 2: Wrap its result using Promise.resolve()

        // TODO 3: Catch the rejection and
        // forward the error using next()
        Promise.resolve(controller(req, res, next)).catch(next);
    };
};

export default asyncHandler;