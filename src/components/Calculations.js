import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { numberFormat } from '../modules/helperFunctions';

class Calculations extends React.Component {
  handleNavLinkClick (event) {
    const clickedElement = event.currentTarget;
    const offset = clickedElement.offsetLeft;

    const parentNode = clickedElement.parentNode;
    const parentOffset = parentNode.offsetLeft;

    parentNode.scroll({
      behavior: 'smooth',
      left: offset - parentOffset,
      top: 0
    });
  }

  render () {
    const { calculations = {} } = this.props;

    return (
      <div className='calculations'>
        <NavLink exact to={'/'} key={0} className='calculations__item calculations__item--add'>
          <span>+</span>
        </NavLink>

        <div className='calculations__items'>
          {Object.keys(calculations).map((key) => {
            const calculation = calculations[key];
            return (
              <NavLink to={`/calculations/${calculation.id}`} key={key} activeClassName='is-active' className={`calculations__item`} onClick={this.handleNavLinkClick}>
                <h2>{calculation.name}</h2>
                <p>{numberFormat(calculation.flatPrice)} + {calculation.interest}%</p>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  }
}

Calculations.propTypes = {
  calculations: PropTypes.shape()
};

export default Calculations;
