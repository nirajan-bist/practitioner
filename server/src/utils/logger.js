import winston, { format } from "winston";

const logFormat = (params) => {
  const { level, message, metadata } = params;
  const { timestamp, context } = metadata || {};

  return `${level} ${timestamp} ${context || ""}:: ${message}`;
};

const logger = new winston.createLogger({
  format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.metadata(), format.prettyPrint()),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.printf(logFormat)),
      level: "debug",
    }),
  ],
  silent: process.env.NODE_ENV === "test",
});

const createLogger = (context) => {
  const childLogger = logger.child({ context });
  const newLogger = (message) => childLogger.info(message);
  newLogger.info = (message) => childLogger.info(message);
  newLogger.warn = (message) => childLogger.warn(message);
  newLogger.error = (message) => childLogger.error(message);
  return newLogger;
};

// Object having write function for callback with morgan.
export const writeStream = {
  write(message) {
    logger.info(message);
  },
};

export default createLogger;
