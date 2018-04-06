import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';

class VariationsLink extends Component {
  render () {
    return (
      <AppContext.Consumer>
        {({ localization }) => (
          <div className='variations-link'>
            { this.props.ready ? <a href='#variations' className='variations-link__link'>{localization.viewVariations }</a> : '' }
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

VariationsLink.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default VariationsLink;
