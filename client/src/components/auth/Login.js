import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../reduxParts/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const changeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='login'>
        <h2>
          <Link to='/' className='text-danger'>
            <i className='fas fa-dice-d20'></i> GymSite
          </Link>
        </h2>
        <div className='container'>
          <div className='alert-danger'>Invalid credentials</div>
          <h1 className='large text-success'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign into Your Account
          </p>
          <form className='form' onSubmit={(e) => submitForm(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <p className='form-text'>Please Enter Your Email</p>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <input type='submit' className='btn-primary' value='Login' />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(login(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
