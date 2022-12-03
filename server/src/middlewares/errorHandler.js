import createLogger from "../utils/logger";
const logger = createLogger("Error handler");

export default function (err, req, res, next) {
  //Postgres unique constriant error
  if (err.code === "23505") {
    return res.status(400).send("User with this email exists already!");
  }

  if (err.message === "Invalid Token" || err.message === "Invalid Refresh Token") {
    return res.status(401).json({ error: { code: 401, message: "Token is Invalid!" } });
  }
  if (err.status === 404) {
    //Route not found
    logger.info(`${req.path} path is not available!`);
    return res.status(404).json({ error: { code: 404, message: "Route is not implemented yet!" } });
  }
  //Server Error
  logger.error(err.stack);
  res.status(500).send({ message: "Server Error Occured!", stack: err.stack });
}
