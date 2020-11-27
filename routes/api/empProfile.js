const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const EmpProfile = require('../../models/EmpProfile');
const User = require('../../models/User');

// @route   =>  Get api/empProfile/me
// @access  =>  Private
// @purpose =>  Private employee profile for employee dashboard
router.get('/me', auth, async (req, res) => {
  try {
    const empProfile = await EmpProfile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!empProfile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(empProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   =>  Post api/empProfile
// @access  =>  Private
// @purpose =>  Create or Update employee profile
router.post(
  '/',
  [
    auth,
    [
      check('employeeJob', 'Job Status is required').notEmpty(),
      check('yearsOfExperience', 'Years of Experience is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      employeeJob,
      bio,
      yearsOfExperience,
      location,
      facebook,
      instragram,
      twitter,
    } = req.body;

    const empProfileFields = {};
    empProfileFields.user = req.user.id;
    if (employeeJob) empProfileFields.employeeJob = employeeJob;
    if (bio) empProfileFields.bio = bio;
    if (yearsOfExperience)
      empProfileFields.yearsOfExperience = yearsOfExperience;
    if (location) empProfileFields.location = location;

    empProfileFields.social = {};
    if (facebook) empProfileFields.social.facebook = facebook;
    if (instragram) empProfileFields.social.instragram = instragram;
    if (twitter) empProfileFields.social.twitter = twitter;

    try {
      let empProfile = await EmpProfile.findOne({ user: req.user.id });
      //   Updating
      if (empProfile) {
        empProfile = await EmpProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: empProfileFields },
          { new: true }
        );
        return res.json(empProfile);
      }
      //   Creating
      empProfile = new EmpProfile(empProfileFields);
      await empProfile.save();
      res.json(empProfile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route   =>  Get api/empProfile
// @access  =>  Public
// @purpose =>  Get all Trainer's profile
router.get('/', async (req, res) => {
  try {
    const empProfiles = await EmpProfile.find().populate('user', [
      'name',
      'avatar',
    ]);
    res.json(empProfiles);
    if (!empProfiles) {
      res.status(400).json({ msg: 'no profile found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   =>  GET api/empProfile/user/:user_id
// @access  =>  Public
// @purpose =>  Get individual Trainer's profile
router.get('/user/:user_id', async (req, res) => {
  try {
    const empProfile = await EmpProfile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    res.json(empProfile);
    if (!empProfile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
  } catch (err) {
    console.error(err);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   =>  DELETE api/empProfile
// @access  =>  Private
// @purpose =>  Delete user and user profile
router.delete('/', auth, async (req, res) => {
  try {
    await EmpProfile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
