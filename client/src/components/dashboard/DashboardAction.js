import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DashboardAction = (props) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn-light my-1'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
    </div>
  );
};

DashboardAction.propTypes = {};

export default DashboardAction;
