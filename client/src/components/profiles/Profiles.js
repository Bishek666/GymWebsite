import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../reduxParts/actions/profile';
import Spinner from '../layout/Spinner';
import ProfileById from './ProfileById';

const Profiles = ({ profile: { profiles, loading }, onGetProfiles }) => {
  useEffect(() => {
    onGetProfiles();
  }, [onGetProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-danger'>Trainers</h1>
          <p className='lead'>
            <i className='far fa-address-card fa-2x m text-primary'></i>
            <span className='medium text-primary'>
              Checkout our professional trainers<i className=''></i>
            </span>
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileById key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propType = {
  profile: PropTypes.object.isRequired,
  onGetProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfiles: () => dispatch(getProfiles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
