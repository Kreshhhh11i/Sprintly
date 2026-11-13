const devUser = (req, res, next) => {
    // TODO 1: Read DEV_USER_ID from process.env
    const user = process.env.devId;
    // TODO 2: Attach it to req.user
    req.user = {
        id: user,
    }
    // TODO 3: Call next() to continue
    next(); 
};

export default devUser;