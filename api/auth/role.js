exports.IsKasir = async (req, res, next) => {
    if (req.user.role === "kasir") {
       next(); 
    }
    return res.status(401).send("Forbidden! You are not Kasir")
}
exports.IsAdmin = async (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        return res.status(401).send("Forbidden! You are not Admin")
    }
}
exports.IsOwner = async (rew, res, next) => {
    if (req.user.role === "owner") {
        next();
    }
    return res.status(401).send("Forbidden! You are not Owner")
}