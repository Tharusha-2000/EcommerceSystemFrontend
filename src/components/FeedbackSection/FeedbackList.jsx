import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackItem from "./FeedbackItem";
import "./Style.css";
import PropTypes from "prop-types";

const FeedbackList = ({ userId, orderId }) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feedback with params:", { userId, orderId });

        const response = await axios.get(
          `https://localhost:7048/api/GetOrderFeedback`,
          {
            params: { userId, orderId },
          }
        );

        console.log("API response:", response.data);

        const feedbackArray = response.data.$values || [];
        setFeedback(feedbackArray);
        console.log("Fetched feedback:", feedbackArray);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    if (userId && orderId) {
      fetchData();
    }
  }, [userId, orderId]);

  console.log("FeedBack", feedback);

  return (
    <div className="feedback-list rounded-2">
      {feedback.length === 0 ? (
        <p className="text-center pt-2">No Feedback Yet from you.</p>
      ) : (
        feedback.map((item) => (
          <FeedbackItem key={item.feedBackId} item={item} />
        ))
      )}
    </div>
  );
};

FeedbackList.propTypes = {
  userId: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
};

export default FeedbackList;