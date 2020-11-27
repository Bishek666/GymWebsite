import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProfileById = ({
  profile: {
    user: { _id, name, avatar },
    employeeJob,
    location,
  },
}) => {
  return (
    <Fragment>
      {employeeJob === 'Yoga Instructor' ||
      employeeJob === 'Jumba Instructor' ||
      employeeJob === 'Bodybuilder Instructor' ? (
        <div className='profile'>
          <img className='round-img' src={avatar} alt='Picture' />
          <div>
            <h2>{name}</h2>
            <p>Works as {employeeJob}</p>
            <p className='my-1'>{location}</p>
            <Link to={`/profile/${_id}`} className='btn-primary'>
              View Profile
            </Link>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ProfileById;
