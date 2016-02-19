'use strict'

var React = require('react')
var History = require('react-router').History
var Varo = require('../../service').Varo

var ReactBootstrap = require('react-bootstrap')
var Button = require('react-bootstrap').Button

module.exports = React.createClass({
  mixins: [History],
  initialState: {authFailed: false},

  /**
   * @returns {exports.initialState|{authFailed}}
   */
  getInitialState: function () {
    return this.initialState
  },

  /**
   * @param event
   */
  handleSubmit: function (event) {
    event.preventDefault();

    var loginMsg = {
      role: 'auth',
      cmd: 'login',
      email: this.refs.username.value,
      pass: this.refs.password.value
    };

    var that = this;
    Varo.act(loginMsg, function (err, reply) {
      if (err) {
        that.history.replaceState(err, '/error')
      }

      if (!reply.isAuthenticated) {
        return that.setState({auth_failed: true});
      }

      var location = that.props.location;
      if (location.state && location.state.nextPathname) {
        that.history.replaceState(null, location.state.nextPathname)
      }
      else {
        that.history.replaceState(null, '/');
      }
    })
  },

  render: function () {
    return (
        <div className="container">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="form-signin-heading">Sign in</h2>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input ref="username" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input ref="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
            <div className="checkbox">
              <label>
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <Button bsStyle="primary" bsSize="large" type="submit" block>Sign in</Button>
          </form>
        </div>
    )
  }
})
