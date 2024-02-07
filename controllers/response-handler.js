export const setResponse = (request, response) => {
    if (request.method === 'GET') {
        if (hasPayload(request)) {
            response.status(400).json();
        } else {
            response.set('Cache-Control', 'no-cache');
            response.status(200).json();
        }
    } else {
        response.status(405).json();
    }
};

export const setUserAPIResponseWithData = (data, request, response, status) => {
    if(Object.keys(request.cookies).length > 0){
        response.status(400).json();
    }
    response.status(status).json(data);
};

export const setUserAPIResponse = (request, response, status) => {
    if(Object.keys(request.cookies).length > 0){
        response.status(400).json();
    }
    response.status(status).json();
};


export const setErrorResponse = (err, response) => {
    console.log(err.message);
    response.status(503).send();
};

export const handleRouteResponse = (request, response, next) => {
    if (request.path === '/healthz') {
        return next();
    }
    response.status(404).send();
}

export const hasPayload = (request) => {
    if (request.get('Content-Length') || 0 > 0 || Object.keys(request.query).length > 0 || Object.keys(request.params).length > 0 || Object.keys(request.cookies).length > 0) {
        return true;
    }
    return false;
}