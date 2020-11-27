import React, { Fragment, useState } from 'react';

const About = () => (
  <Fragment>
    <div className='about'>
      <div className='inner-right'>
        <h1 className='large'>About us</h1>
        <p className='lead'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quidem vel
          veniam quaerat quia placeat iste, possimus consequuntur sapiente
          maxime non quae cum dolorem expedita voluptas. Expedita totam iusto
          error?
        </p>
        <div className='services medium'>
          <i className='fas fa-dumbbell text-primary'>
            <span> Body Building</span>
          </i>
          <i className='fas fa-spa text-light'>
            <span> Yoga</span>
          </i>
          <i className='fas fa-heartbeat text-danger'>
            <span> Dancing</span>
          </i>
        </div>
      </div>
    </div>
  </Fragment>
);

export default About;
