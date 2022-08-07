import winston from "winston";

const buildProdLogger = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'logfiles/warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'logfiles/error.log', level: 'error' })
        ]
    })
}

const buildDevLogger = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info' })
        ]
    })
}

const logger = process.env.NODE_ENV === 'PROD' ? buildProdLogger() : buildDevLogger();

export default logger;