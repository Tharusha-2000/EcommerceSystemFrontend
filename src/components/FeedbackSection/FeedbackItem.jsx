import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const FeedbackItem = ({ item }) => {
  return (
    <Card>
      <div className="num-display">{item.rate}</div>
      <div className="text-display">{item.feedbackMessage}</div>
    </Card>
  );
};

FeedbackItem.propTypes = {
  item: PropTypes.shape({
    feedBackId: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    feedbackMessage: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeedbackItem;