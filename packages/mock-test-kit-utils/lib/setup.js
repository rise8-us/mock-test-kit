const fs = require('fs');
const path = require('path')

const createHandler = (endpoint, method) => async (request, reply) => {
    const fakes = endpoint[method].data;

    const fake = fakes.find(({request: req, response: res}) => {
        return req && request && JSON.stringify(request.query) === JSON.stringify(req.query) &&
            JSON.stringify(request.params) === JSON.stringify(req.params) &&
            JSON.stringify(request.body) === JSON.stringify(req.body);
    });

    if (fake) {
        let response = fake.response;

	    if (Array.isArray(fake.response)) {
            response = fake.response.shift();
            fake.response.push(response);

            reply.code(response.status).send(response.body);
        }

        reply.code(response.status).send(response.body);
    } else {
        reply.code(404).send({error: 'Not found.', message: 'Not found.', statusCode: 404});
    }
}

const collectEndpoints = (name, dir) => {
    const endpoints = {};

    readFiles(dir, (filename, content) => {
        JSON.parse(content).forEach(({api, endpoint, httpMethod, request, response}) => {
            if (api === name && endpoint !== '/graphql') {
                if (endpoints[endpoint] && endpoints[endpoint][httpMethod]) {
                    endpoints[endpoint][httpMethod].data.push({request, response});
                } else {
                    endpoints[endpoint] = {
                        ...endpoints[endpoint],
                        [httpMethod]: {
                            data: [{request, response}]
                        }
                    }
                }
            }
        });
    });

    return endpoints;
}

const generateHandlers = (endpoints, fastify) => {
    Object.keys(endpoints).forEach((path) => {
        const endpoint = endpoints[path];
        const httpMethods = Object.keys(endpoint);

        httpMethods.forEach((method) => {
            fastify[method.toLowerCase()](path, createHandler(endpoint, method));
        });
    });
}

const readFiles = (dirname, onFileContent) => {
    fs.readdirSync(dirname).forEach(function (filename) {
        onFileContent(filename, fs.readFileSync(path.join(dirname, filename), 'utf-8'));
    });
};

const setupRest = (name, dir, fastify) => generateHandlers(collectEndpoints(name, dir), fastify);

module.exports = {
    createHandler,
    setupRest
};
