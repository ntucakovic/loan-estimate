import React from 'react';
import PropTypes from 'prop-types';
import { resolutions } from '../modules/constants';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';

class Share extends React.Component {
  static ICON_SMALL = 32;
  static ICON_LARGE = 48;

  state = {
    iconSize: Share.ICON_SMALL
  }

  componentWillMount () {
    window.addEventListener('resize', this.updateIconSize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateIconSize);
  }

  updateIconSize = () => {
    const iconSize = window.outerHeight >= resolutions.y.md && window.outerWidth >= resolutions.x.md ? Share.ICON_LARGE : Share.ICON_SMALL;

    this.setState({ iconSize });
  }

  render () {
    const { url, title, hashtags, hashtag, via, localization } = this.props;
    const { iconSize } = this.state;

    return (
      <div className='share'>
        <span className='share__label' style={{
          lineHeight: `${iconSize}px`
        }}>{localization.share}</span>

        <FacebookShareButton quote={title} url={url} hashtag={hashtag}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>

        <TwitterShareButton title={title} url={url} hashtags={hashtags} via={via}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>

        <LinkedinShareButton title={title} url={url}>
          <LinkedinIcon size={iconSize} round />
        </LinkedinShareButton>
      </div>
    );
  }
}

Share.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  via: PropTypes.string,
  hashtag: PropTypes.string,
  hashtags: PropTypes.array,
  localization: PropTypes.object
};

export default Share;
