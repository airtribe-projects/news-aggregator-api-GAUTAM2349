
const requestTracker = (req, res, next) => {
    console.log("Request made at:", new Date().toISOString(),"at route",req.url);
    next();
}

module.exports = requestTracker;