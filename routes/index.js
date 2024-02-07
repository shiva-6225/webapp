import connectionRouter from './connection-route.js';
import userRouter from './user-route.js';
import { handleRouteResponse } from '../controllers/response-handler.js';

export default (app) => {
    // app.use(handleRouteResponse);
    app.use('/healthz', connectionRouter);
    app.use('/v1/user/self', userRouter);
}