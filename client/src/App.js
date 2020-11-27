import { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import About from './components/layout/About';
import Dashboard from './components/dashboard/Dashboard';
import AuthRoute from './components/routing/AuthRoute';
import CreateProfile from './components/layout/profile-form/CreateProfile';
import EditProfile from './components/layout/profile-form/EditProfile';

// Redux parts
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './reduxParts/actions/auth';
import setAuthToken from './utilis/setAuthToken';

// import Alert from './components/layout/Alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/about' component={About} />
              <AuthRoute exact path='/dashboard' component={Dashboard} />
              <AuthRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <AuthRoute exact path='/edit-profile' component={EditProfile} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
