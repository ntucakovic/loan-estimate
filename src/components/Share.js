import React from 'react';
import PropTypes from 'prop-types';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';

const Share = ({ url, title, hashtags, hashtag, via }) => (
  <div className='share'>
    <FacebookShareButton quote={title} url={url} hashtag={hashtag}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>

    <TwitterShareButton title={title} url={url} hashtags={hashtags} via={via}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>

    <LinkedinShareButton title={title} url={url}>
      <LinkedinIcon size={32} round />
    </LinkedinShareButton>
  </div>
);

Share.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  via: PropTypes.string,
  hashtag: PropTypes.string,
  hashtags: PropTypes.array
};

export default Share;
