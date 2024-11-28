import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const FeedbackItem = ({ item }) => {
  return (
    <Card>
      <div className="num-display">{item.rate}</div>
      <div className="text-display">{item.feedBack}</div>
    </Card>
  );
};

FeedbackItem.propTypes = {
  item: PropTypes.shape({
    feedBackId: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    feedBack: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeedbackItem;