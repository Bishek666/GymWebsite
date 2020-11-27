import React, { Fragment, useState } from 'react';
import Register from '../auth/Register';
import About from './About';
import { Link } from 'react-router-dom';
import { Link as LinkS, animateScroll as scroll } from 'react-scroll';
import { motion } from 'framer-motion';
import Pricing from './Pricing';
import Alert from './Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../reduxParts/actions/auth';

const Landing = ({ auth: { isAuthenticated, loading }, onLogout }) => {
  const [visible, setVisible] = useState('hidden');
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  console.log();
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > 20) {
      setVisible('visible');
    } else {
      setVisible('hidden');
    }
  });
  // useEffect(() => {
  //   scroll.scrollTo(2200);
  // }, []);

  const authButton = (
    <div>
      {/* <LinkS
      activeClass='active'
      to='register'
      spy={true}
      smooth={true}
      offset={-125}
      duration={600}
      on={500}
      className='btn-danger-border'
    >
      Sign Up
    </LinkS> */}
      <Link to='/' onClick={onLogout} className='btn-light-border'>
        Logout
      </Link>
    </div>
  );
  const guestButton = (
    <div>
      <LinkS
        activeClass='active'
        to='register'
        spy={true}
        smooth={true}
        offset={-125}
        duration={600}
        on={500}
        className='btn-danger-border'
      >
        Sign Up
      </LinkS>
      <Link to='/login' className='btn-light-border'>
        Login
      </Link>
    </div>
  );

  return (
    <Fragment>
      <div>
        <section className='landing'>
          <div className='dark-overlay'>
            <div className='landing-inner'>
              <h1 className='x-large'>
                Get <span className='text-danger'>Strong</span>
              </h1>
              <p className='lead py-1'>
                Train on our Gym to get the best result and enjoy your healthy
                life
              </p>
              {!loading && (
                <Fragment>
                  {isAuthenticated ? authButton : guestButton}
                </Fragment>
              )}
            </div>
          </div>
        </section>
        <section className='container'>
          <About />
        </section>
        <Pricing />

        <section className='container' style={{ marginBottom: '0.2rem' }}>
          <Alert />
        </section>
        <Register />
        {visible === 'visible' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='btn-danger'
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '0',
              right: '1rem',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
            }}
          >
            <i
              className='fas fa-arrow-up'
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '8px',
                fontSize: '2rem',
              }}
            ></i>
          </motion.div>
        ) : null}
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
