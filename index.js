require("dotenv").config()
const express = require("express")
const app = express()
const pino = require('pino');
const pinoHttp = require("pino-http")
const { randomUUID } = require('crypto');
const connection = require("./config/database-connection")
const cookies = require("cookie-parser")
const fileUpload = require("express-fileupload")
const path = require("path");
const errorHandler = require("./middlewares/error-handler")
const routesHandler = require("./routes")
app.use(pinoHttp({
    logger: pino({
        transport: {
            target: 'pino-pretty',
            options: { singleLine: true, ignore: 'pid,hostname' },
        },
    }),
    genReqId: () => randomUUID().slice(0, 8),
    serializers: {
        req: (req) => ({ id: req.id, method: req.method, url: req.url }),
        res: (res) => ({ statusCode: res.statusCode }),
    },
}))
app.use(express.json())
app.use(cookies());
app.use(fileUpload());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routesHandler);
app.use(errorHandler);

(async () => {
    await connection()
})();

app.listen(3000, () => {
})



