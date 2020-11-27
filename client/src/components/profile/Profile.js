import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../reduxParts/actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileBio from './ProfileBio';
import { animateScroll as scroll } from 'react-scroll';
const Profile = ({
  profile: { profile, loading },
  onGetProfileById,
  match,
  auth,
}) => {
  useEffect(() => {
    onGetProfileById(match.params.id);
    scroll.scrollTo(70);
  }, [onGetProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn-light'>
            Back To Trainers
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileBio profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  onGetProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfileById: (userId) => dispatch(getProfileById(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
