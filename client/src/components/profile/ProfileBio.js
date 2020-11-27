import React from 'react';
import PropTypes from 'prop-types';

const ProfileBio = ({
  profile: {
    user: { name },
    bio,
    yearsOfExperience,
  },
}) => {
  return (
    <div className='profile-about p-1   ' style={{ backgroundColor: 'black' }}>
      <h2 className='text-danger'>{name}'s Bio</h2>
      <div className='line' style={{ margin: '0.6rem' }}></div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed doloremque
        nesciunt, repellendus nostrum deleniti recusandae nobis neque modi
        perspiciatis similique?
      </p>
    </div>
  );
};

ProfileBio.propTypes = {};

export default ProfileBio;
