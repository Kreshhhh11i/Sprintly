const devUser = (req, res, next) => {
    const user = process.env.devId;
    req.user = {
        id: user,
    }
    next(); 
};

export default devUser;