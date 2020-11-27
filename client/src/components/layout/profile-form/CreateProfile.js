import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEmpProfile } from '../../../reduxParts/actions/profile';
import { Link, withRouter } from 'react-router-dom';
import Alert from '../Alert';

const CreateProfile = ({ onCreateEmpProfile, history }) => {
  const [formData, setFormData] = useState({
    employeeJob: '',
    bio: '',
    yearsOfExperience: '',
    location: '',
    facebook: '',
    instagram: '',
    twitter: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const changeValue = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    onCreateEmpProfile(formData, history);
  };

  const {
    employeeJob,
    bio,
    yearsOfExperience,
    location,
    facebook,
    instagram,
    twitter,
  } = formData;
  return (
    <Fragment>
      <Alert />
      <h1 className='large text-primary'>Create Your Profile</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => submitForm(e)}>
        <div className='form-group'>
          <select
            name='employeeJob'
            value={employeeJob}
            onChange={(e) => changeValue(e)}
          >
            <option value='0'>* Select Job Status</option>
            <option value='Bodybuilder Instructor'>
              Bodybuilder Instructor
            </option>
            <option value='Jumba Instructor'>Jumba Instructor</option>
            <option value='Yoga Instructor'>Yoga Instructor</option>
            <option value='Manager'>Manager</option>
            <option value='Staff'>Staff</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Fill the following form as per required
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*Years Of Experience'
            name='yearsOfExperience'
            value={yearsOfExperience}
            onChange={(e) => changeValue(e)}
          />
          <small className='form-text'>
            Must be more than or equal to 1 years of experience
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => changeValue(e)}
          />
          <small className='form-text'>(eg. Kathmandu, Dhalko)</small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => changeValue(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className='btn-light'
          >
            Add Social Network Links
          </button>
          <span className='text-success'> Optional</span>
        </div>

        {displaySocialInputs ? (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => changeValue(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => changeValue(e)}
              />
            </div>
          </Fragment>
        ) : null}

        <input type='submit' className='btn-primary my-1' />
        <Link className='btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  onCreateEmpProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateEmpProfile: (formData, history) =>
      dispatch(createEmpProfile(formData, history)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile));
