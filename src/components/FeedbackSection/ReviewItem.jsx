import React from "react";
import PropTypes from "prop-types";
import profileIcon from "../../utils/Images/ProfileIconRed.png";
import { CircularProgress, IconButton, Rating } from "@mui/material";
import "./Style.css";

const ReviewItem = ({ item }) => {
  return (
    <div className="Card col-md-7 p-3 justify-content-left align-items-left ">
      <div className="reviewItem h-auto">
        <div className="d-flex mt-0 pt-0">
          <img className="ProfileIcon" src={profileIcon} alt="profile" />
          <div className="Username mt-auto mb-auto fw-bold ps-3">
            {item.firstName} {item.lastName}
          </div>

          <div className="rate mt-auto mb-auto me-2 ms-auto">
            <Rating value={item.rate} />
          </div>
        </div>

        <div className="text-display justify-content-left align-items-left d-flex ms-5 ps-3">
          {item.feedbackMessage}
        </div>
        <div className="text-display justify-content-end align-items-right d-flex ms-auto me-2">
          {item.givenDate}
        </div>
      </div>
    </div>
  );
};

ReviewItem.propTypes = {
  item: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    feedbackMessage: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    givenDate: PropTypes.string.isRequired,
  }).isRequired,
};
export default ReviewItem;
