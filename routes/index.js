const connectionRouter = require('./connection-route.js');
const userRouter = require('./user-route.js');
const verifyRouter = require('./verify-route.js');

module.exports = (app) => {
    app.use('/healthz', connectionRouter);
    app.use('/v1/user/self', userRouter);
    app.use('/verify', verifyRouter);
};
