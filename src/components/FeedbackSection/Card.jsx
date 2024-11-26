import React from "react";
import PropTypes from "prop-types";
import "./Style.css";

const Card = ({ children, reverse = false }) => {
  return <div className={`card ${reverse ? 'reverse' : ''}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;