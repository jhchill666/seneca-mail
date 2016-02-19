'use strict'

var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute

var Shell = require('./components/shell')
var Login = require('./components/pages/login')
var Dashboard = require('./components/pages/dashboard')

var Varo = require('./service').Varo
var Auth = require('./service/auth')
var Session = require('./service/session')

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

var routes = (
    <Router history={history}>
        <Route path="/" component={Dashboard} onEnter={requireAuth} />
        <Route path="login" component={Login} />
    </Router>
)

function start () {
    Varo.plugin(Session)
        .plugin(Auth)

    Varo.act({role: 'session', cmd: 'start'}, function (err) {
        if (!err) {
            ReactDom.render(routes, document.getElementById('app'))
        }
    })
}

function requireAuth (nextState, replaceState, done) {
    Varo.act({role: 'auth', cmd: 'isAuthenticated'}, function (err, reply) {
        if (!reply.isAuthenticated) {
            replaceState({nextPathname: nextState.location.pathname}, '/login')
        }
        return done()
    })
}

start();
