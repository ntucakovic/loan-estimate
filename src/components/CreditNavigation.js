import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CreditResult from './CreditResult';

class CreditNavigation extends React.Component {
  static handleNavLinkClick (event) {
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
    const { calculations = {}, localization } = this.props;

    return (
      <div className='credit-navigation'>
        <NavLink exact to={'/'} key={0} className='credit-navigation__item credit-navigation__item--add'>
          <span>+</span>
        </NavLink>

        <div className='credit-navigation__items'>
          {Object.keys(calculations).map((key) => {
            const calculation = calculations[key];
            return (
              <NavLink to={`/calculations/${calculation.id}`} key={key} activeClassName='is-active' className={`credit-navigation__item`} onClick={CreditNavigation.handleNavLinkClick}>
                <h2>{calculation.name}</h2>
                <p>
                  {(() => {
                    const rate = CreditResult.getPropValue(calculation.monthlyRate);
                    const months = CreditResult.getPropValue(calculation.monthTotal);

                    if (rate !== '-' && months !== '-') {
                      return `${localization.monthlyRate}: ${rate} x ${months} ${localization.months}`;
                    }

                    return '-';
                  })()}
                </p>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  }
}

CreditNavigation.propTypes = {
  localization: PropTypes.object,
  calculations: PropTypes.shape()
};

export default CreditNavigation;
