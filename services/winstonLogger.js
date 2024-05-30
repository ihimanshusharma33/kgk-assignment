import {createLogger,format,transports} from 'winston';
const { combine, timestamp, printf, errors } = format;

// Define the log format and transports
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });
  const logger = createLogger({
    level: 'info',
    format: combine(
      timestamp(),
      errors({ stack: true }),
      logFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'combined.log' }),
      new transports.File({ filename: 'errors.log', level: 'error' })
    ],
  });  
  export default logger;