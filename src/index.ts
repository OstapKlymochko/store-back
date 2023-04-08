import express, {NextFunction, Request, Response} from 'express';
import * as mongoose from "mongoose";

import {ApiError} from "./error";
import {authRouter} from './routers';
import {configs} from "./configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    // console.log(err);
    return res.status(status).json({
        message: err.message
    });
})

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.DB_URL);
    console.log(`Server has started on port ${configs.PORT}`);
})
