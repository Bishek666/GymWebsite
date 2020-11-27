import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Link as LinkS, animateScroll as scroll } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../reduxParts/actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, onLogout }) => {
  const location = useLocation();
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const authLinks = (
    <ul>
      <li>
        {location.pathname.length > 1 ? (
          <Link to={'/about'}>About</Link>
        ) : (
          <LinkS
            to={'about'}
            spy={true}
            smooth={true}
            offset={-70}
            duration={600}
          >
            About
          </LinkS>
        )}
      </li>
      <li>
        <Link to='/profiles'>Trainers</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        {location.pathname.length > 1 ? (
          <Link to={'/about'}>About</Link>
        ) : (
          <LinkS
            to={'about'}
            spy={true}
            smooth={true}
            offset={-70}
            duration={600}
          >
            About
          </LinkS>
        )}
      </li>
      <li>
        <Link to='/profiles'>Trainers</Link>
      </li>
      <li>
        {location.pathname.length > 1 ? (
          <Link to={'/register'}>Register</Link>
        ) : (
          <LinkS
            to={'register'}
            spy={true}
            smooth={true}
            offset={-120}
            duration={600}
          >
            Register
          </LinkS>
        )}
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/' onClick={scrollToTop}>
            <i className='fas fa-dice-d20'></i> GymSite
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
