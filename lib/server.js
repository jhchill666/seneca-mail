var Chairo = require('chairo')
var Hapi = require('hapi')
var Inert = require('inert')
var Bell = require('bell')
var Path = require('path')

var internals = {
    port: 3200,
    hapiPlugins: [
        Chairo,
        Inert,
        Bell
    ]
};

internals.start = function () {
    var server = new Hapi.Server()
    server.connection({port: internals.port})

    var plugins = internals.hapiPlugins;
    server.register(plugins, function (err) {
        if (err) internals.stopProcess(err)

        internals.authStrategies(server.auth);
        internals.registerSenecaPlugins(server.seneca);
        internals.registerRoutes(server);

        server.start(function (err) {
            if (err) internals.stopProcess(err)
            else console.log('server started on port ' + server.info.port)
        })
    })
}

internals.authStrategies = function(auth) {
    auth.strategy('oauth', 'bell', {
    });
}

internals.registerSenecaPlugins = function (seneca) {
    // To add
}

internals.registerRoutes = function (server) {
    server.route({
        method: 'GET',
        path: '/{path*}',
        config: {
            auth: 'oauth',
            handler: function (request, reply) {
                reply.file(Path.join(__dirname, '/deploy/index.html'))
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/app.js',
        handler: function (request, reply) {
            reply.file(Path.join(__dirname, '/deploy/app.js'))
        }
    })

    server.route({
        method: 'GET',
        path: '/styles.css',
        handler: function (request, reply) {
            reply.file(Path.join(__dirname, '/deploy/styles.css'))
        }
    })
}

internals.stopProcess = function (err) {
    console.log(err)
    process.exit(1)
}

internals.start()
