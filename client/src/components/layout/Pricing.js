import React from 'react';
import { Link as LinkS } from 'react-scroll';
const Pricing = () => {
  return (
    <div className='pricing'>
      <h1 style={{ marginBottom: '2rem' }}>Pricing</h1>
      <div className='inner-container'>
        <span>
          <h3 className='large'>1 month</h3>
          <h1 className='x-large text-danger'>Rs1500</h1>
          <h3 className='lead my-3'>Staff Hour only</h3>
          <h3 className='lead'>No FITNESS CONSULTATION*</h3>
          <LinkS
            activeClass='active'
            to='register'
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className='btn-danger my-3 hide-sm'
          >
            Join Now
          </LinkS>
        </span>
        <span>
          <h3 className='large'>Basic</h3>
          <h1 className='x-large text-danger'>
            Rs2000<span className='lead'>/month</span>
          </h1>
          <h3 className='lead my-3'>24Hr Access</h3>
          <h3 className='lead'>FREE FITNESS CONSULTATION*</h3>
          <LinkS
            activeClass='active'
            to='register'
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className='btn-danger my-3 hide-sm'
          >
            Join Now
          </LinkS>
        </span>
        <span>
          <h3 className='large'>Premium</h3>
          <h1 className='x-large text-danger'>
            Rs3000<span className='lead'>/month</span>
          </h1>
          <h3 className='lead my-3'>24Hr Access</h3>
          <h3 className='lead'>
            <b className='text-danger'>PRO</b> FITNESS CONSULTATION*
          </h3>
          <LinkS
            activeClass='active'
            to='register'
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className='btn-danger my-3 hide-sm'
          >
            Join Now
          </LinkS>
        </span>
        <span>
          <h3 className='large'>1 Year</h3>
          <h1 className='x-large text-danger'>Rs30,000</h1>
          <h3 className='lead my-3'>24Hr Access</h3>
          <h3 className='lead'>
            <b className='text-danger'>Pro</b> FITNESS CONSULTATION*
          </h3>
          <LinkS
            activeClass='active'
            to='register'
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className='btn-danger my-3 hide-sm'
          >
            Join Now
          </LinkS>
        </span>
      </div>
    </div>
  );
};

export default Pricing;
