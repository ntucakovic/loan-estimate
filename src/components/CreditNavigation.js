import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import CreditResult from "./CreditResult";

class CreditNavigation extends React.Component {
  static handleNavLinkClick(event) {
    const clickedElement = event.currentTarget;
    const offset = clickedElement.offsetLeft;

    const parentNode = clickedElement.parentNode;
    const parentOffset = parentNode.offsetLeft;

    parentNode.scroll({
      behavior: "smooth",
      left: offset - parentOffset,
      top: 0
    });
  }

  render() {
    const { calculations = {}, localization, defaultCurrency } = this.props;

    return (
      <div className="credit-navigation">
        <NavLink
          exact
          to={"/"}
          key={0}
          className="credit-navigation__item credit-navigation__item--add"
        >
          <span>+</span>
        </NavLink>

        <div className="credit-navigation__items">
          {Object.keys(calculations).map(key => {
            const calculation = calculations[key];
            const usedCurrency = calculation.currency || defaultCurrency;

            return (
              <NavLink
                to={`/calculations/${calculation.id}`}
                key={key}
                activeClassName="is-active"
                className={`credit-navigation__item`}
                onClick={CreditNavigation.handleNavLinkClick}
              >
                <h2>{calculation.name}</h2>
                <p>
                  {CreditResult.getPayoffDetails(
                    usedCurrency,
                    calculation.monthlyRate,
                    calculation.monthTotal,
                    localization.months
                  )}
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
  defaultCurrency: PropTypes.string,
  localization: PropTypes.object,
  calculations: PropTypes.shape()
};

export default CreditNavigation;
