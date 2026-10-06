function errorHandler(err, req, res, next) {
  if (err.message === "USERNAME_EXISTS") {
    req.log.warn("username already exist")
    return res.status(409).json({ message: "username already exists" });
  }
  if (err.message === "INVALID_CREDENTIALS") {
    req.log.warn("invalid username or password")
    return res.status(401).json({ message: "invalid username or password" });
  }
  if (err.message === "POST_NOT_FOUND") {
    req.log.warn({ userId: req.user.userId }, "couldn't find post")
    return res.status(404).json({ message: "couldn't find post" });
  }


  if (err.name === "CastError") {
    req.log.warn("invalid id")
    return res.status(400).json({ message: "invalid id" })
  }
  console.error(err)
  req.log.error({ reference: req.id }, "server side error")
  res.status(500).json({ message: "internal server error", reference: req.id })
}


module.exports = errorHandler