import React from "react";
import PropTypes from "prop-types";
import "./Style.css";

const SendButton = ({ children, type, isDisabled = false }) => {
  return (
    <button type={type} disabled={isDisabled} className="btn dbtn sendbtn">
      {children}
    </button>
  );
};

SendButton.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]).isRequired,
    isDisabled: PropTypes.bool,
  };
  
export default SendButton;