import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedStrings from 'react-localization';

class VariationsLink extends Component {
  constructor (props) {
    super(props);

    this.strings = this.props.localizedStrings;
  }
  render () {
    return (
      <div className='variations-link'>
        { this.props.ready ? <a href='#variations' className='variations-link__link'>{this.strings.viewVariations }</a> : '' }
      </div>
    );
  }
}

VariationsLink.propTypes = {
  ready: PropTypes.bool.isRequired,
  localizedStrings: PropTypes.instanceOf(LocalizedStrings)
};

export default VariationsLink;
