import React from 'react';
import githubIcon from './github.svg';
import Isvg from 'react-inlinesvg';

const RepositoryLink = function (props) {
  return (
    <div className='repository-link'>
      <a {...props}><Isvg src={githubIcon} /></a>
      <div className='repository-link__background' />
    </div>
  );
};

RepositoryLink.defaultProps = {
  href: 'https://github.com/ntucakovic/portfolio',
  target: '_blank',
  rel: 'noopener noreferrer',
  title: 'Read code on GitHub'
};

export default RepositoryLink;
