import React, { Fragment } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setAlert } from '../../reduxParts/actions/alert';
import { register } from '../../reduxParts/actions/auth';

const Register = ({ onSetAlert, onRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const changeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      onSetAlert('password dont match', 'danger');
    } else {
      onRegister({ name, email, password });
    }
  };

  // Redirect if registered
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <Fragment>
      <div className='row register'>
        <div
          className='col-6 fullwidth-sm'
          style={{ backgroundColor: 'rgb(29, 29, 29)', paddingRight: '6rem' }}
        >
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i>Create Your Account
          </p>
          <form className='form' onSubmit={(e) => submitForm(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => changeValue(e)}
              />
              <p className='form-text'>
                This site uses Gravatar, so make a gravatar profile to get an
                profile image on profile
              </p>
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <input type='submit' className='btn-primary' value='Regiser' />
          </form>
          <p className='my-1'>
            Already have an Account?{' '}
            <Link to='/login' className='text-success'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Register.propType = {
  onSetAlert: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAlert: (msg, alertType) => dispatch(setAlert(msg, alertType)),
    onRegister: ({ name, email, password }) =>
      dispatch(register({ name, email, password })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
