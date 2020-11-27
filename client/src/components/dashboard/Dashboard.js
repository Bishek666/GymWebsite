import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  deleteAccount,
  getCurrentProfile,
} from '../../reduxParts/actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Alert from '../layout/Alert';

const Dashboard = ({
  onGetCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  onDeleteAccount,
}) => {
  useEffect(() => {
    onGetCurrentProfile();
  }, [onGetCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Alert />
      <h1 className='large text-danger'>Dashboard</h1>
      <p
        className='lead btn-dark-border'
        style={{ background: 'none', transform: 'none' }}
      >
        <i className='fas fa-user'></i> Welcome{' '}
        <span className='text-primary medium'>
          <b>{user && user.name}</b>
        </span>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <div className='my-2'>
            <div className='btn-danger' onClick={onDeleteAccount}>
              <i className='fas fa-use-minus'></i>Delete Account
            </div>
          </div>
        </Fragment>
      ) : (
        <div className='my-1'>
          <Alert />
          <p>You haven't made any profile yet</p>
          <Link to='/create-profile' className='btn-primary my-1'>
            Create Profile
          </Link>
          <div className='my-2'>
            <div className='btn-danger' onClick={onDeleteAccount}>
              <i className='fas fa-use-minus'></i>Delete Account
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onGetCurrentProfile: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentProfile: () => dispatch(getCurrentProfile()),
    onDeleteAccount: () => dispatch(deleteAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
