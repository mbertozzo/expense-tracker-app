import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router/immutable';
import { Helmet } from 'react-helmet';

// Containers
import Dashboard from 'containers/Dashboard';
import Add from 'containers/Add';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

//Components
import MainNavbar from 'components/App/Navbar';
import Header from 'components/App/Header';
import Footer from 'components/App/Footer';

// Styles and assets
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


const App = (props) => {

  return (
    <div className="main-content">
      <Helmet>
        <title>Avenal Manager</title>
        <meta charSet="utf-8" />
      </Helmet>

      <MainNavbar brandText="Avenal" />
      <Header />

      <Switch>
        <Route exact path="/" render={(routeProps) => <Dashboard {...routeProps} {...props} />} />
        <Route path="/add" render={(routeProps) => <Add {...routeProps} {...props} />} />
        <Route component={NotFoundPage} />
      </Switch>
      
      <Footer />

    </div>
  );

}

const mapDispatchToProps = (dispatch) => {
  return {
    _changeRoute: url => dispatch(push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withRouter(withConnect(App))