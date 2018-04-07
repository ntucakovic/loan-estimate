import React from 'react';
import githubIcon from '../assets/images/github.svg';
import Isvg from 'react-inlinesvg';

const RepositoryLink = function (props) {
  return (
    <div className='repository-link'>
      <a {...props}><Isvg src={githubIcon} /></a>
      <div className='repository-link__background' />
    </div>
  );
};

export default RepositoryLink;
