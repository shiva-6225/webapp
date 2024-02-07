import registerRouter from './routes/index.js'


const initialize = (app) => {
    
    registerRouter(app);
}


export default initialize;