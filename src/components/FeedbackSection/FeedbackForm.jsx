import React, { useEffect, useState } from "react";
import axios from "axios";
import RatingSelect from "./RatingSelect";
import Card from "./Card";
import "./Style.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const FeedbackForm = ({ userId, orderId, onClose, onSave }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [hasFeedback, setHasFeedback] = useState(false);

  useEffect(() => {
    const checkFeedback = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7046/api/GetFeedbackByOrderId/${orderId}`
        );
        const feedbackArray = response.data.$values || [response.data];
        setHasFeedback(feedbackArray.length > 0);
      } catch (error) {
        console.error("Error checking feedback:", error);
      }
    };

    checkFeedback();
  }, [orderId]);

  useEffect(() => {
    if (text.length === 0) {
      setBtnDisabled(true);
      setMessage("");
    } else {
      setMessage("");
      setBtnDisabled(false);
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentRating = Number(sessionStorage.getItem("rating"));

    if (text.trim().length > 0) {
      const newFeedback = {
        orderId,
        feedbackMessage: text,
        rate: currentRating,
        givenDate: new Date().toISOString().split("T")[0],
      };

      try {
        await axios.post(
          "https://localhost:7046/api/SaveProductFeedback",
          newFeedback
        );
        toast.success("Feedback saved successfully");
        onClose();
        onSave(newFeedback);
        setText("");

        console.log("Saved Successfully");
        console.log("New FeedBack:", newFeedback);
      } catch (error) {
        console.error("Error submitting feedback:", error);
        console.log(error);
      }
    } else {
      console.log("Feedback should be at least 10 characters long");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate this order?</h2>
        <RatingSelect
          selected={rating}
          select={(rating) => {
            console.log("Selected rating:", rating);
            setRating(rating);
            sessionStorage.setItem("rating", rating.toString());
          }}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleTextChange}
            disabled={hasFeedback} // Disable input if feedback already given
          />
          <button
            type="submit"
            disabled={btnDisabled || hasFeedback}
            className=" dbtn sendbtn white-text"
          >
            Send
          </button>
        </div>
        {message && <div className="message">{message}</div>}
        {hasFeedback && (
          <div className="message">Your feedback already given for this order.</div>
        )}
      </form>
    </Card>
  );
};

FeedbackForm.propTypes = {
  userId: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default FeedbackForm;