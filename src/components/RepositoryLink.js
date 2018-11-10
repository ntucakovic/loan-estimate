import React from "react";
import Isvg from "react-inlinesvg";
import githubIcon from "../assets/images/github.svg";

const RepositoryLink = function(props) {
  return (
    <div className="repository-link">
      <a {...props}>
        <Isvg src={githubIcon} />
      </a>
      <div className="repository-link__background" />
    </div>
  );
};

export default RepositoryLink;
