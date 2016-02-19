'use strict'

var React = require('react')

var ReactBootstrap = require('react-bootstrap')
    , Nav = ReactBootstrap.Nav
    , Navbar = ReactBootstrap.Navbar
    , NavItem = ReactBootstrap.NavItem
    , NavDropdown = ReactBootstrap.NavDropdown
    , Button = ReactBootstrap.Button
    , DropdownButton = ReactBootstrap.DropdownButton
    , MenuItem = ReactBootstrap.MenuItem
    , Jumbotron = ReactBootstrap.Jumbotron,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col,
    Grid = ReactBootstrap.Grid;

module.exports = React.createClass({
  render: function () {
    return (
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">micro-test</a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Google Mail Api <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Gogle Mail Api</a></li>
                      <li><a href="#">Google Contacts Api</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="page-header">
              <h1>Collecting emails ...</h1>
            </div>
            <p>Back to <a href="../sticky-footer">the default sticky footer</a> minus the navbar.</p>
          </div>

          <Grid>
            <Row>
              <Col xs={12} md={8}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>

          <footer className="footer">
            <div className="container">
              <p className="text-muted">Place sticky footer content here.</p>
            </div>
          </footer>

        </div>
    )
  }
})
