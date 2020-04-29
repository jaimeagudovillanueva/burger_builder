import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

// React.lazy allows us to lazy loading components
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  // We can destructure props in multiple variables. In this case we only need the function onTryAutoSignup
  const { onTryAutoSignup } = props;
  // The second parameter indicates when the useEffect run. 
  // It receives and array of elements, if any of the elements changes the method will be executed.
  // With [] it only runs once, when the component is mounted
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/"/>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    );
  }
  return (
    <div>
        <Layout>
          {/* Suspense works with React.lazy() in order to render something while we are waiting 
          for the lazy components to load */}
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);