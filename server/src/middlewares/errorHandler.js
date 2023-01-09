import createLogger from "../utils/logger";
const logger = createLogger("Error handler");

export default function (err, req, res, next) {
  if (err.isJoi) {
    return res.status(400).json({ error: { code: 400, message: err.message } });
  }
  if (err.isCustom) {
    return res.status(err.code).json({ error: err.toResponseObject() });
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
