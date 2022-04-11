import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className='not_found-container'>
        <h1 className='not_found-header'>
          Sorry, The page you are looking for doesn't exist
        </h1>
        <Link className='to_home-btn' to='/'>
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
