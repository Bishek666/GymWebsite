import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    employeeJob,
    location,
    social,
    yearsOfExperience,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-danger'>
      <img className='round-img my-1' src={avatar} alt='Picture' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        Works as <b>{employeeJob}</b>
      </p>
      <p className='text-upper my'>{location}</p>
      <h2 class='btn-dark'>Worked for {yearsOfExperience} years</h2>
      <div className='icons my-1'>
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
