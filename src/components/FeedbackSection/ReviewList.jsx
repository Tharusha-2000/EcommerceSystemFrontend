import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Style.css";
import ReviewItem from "./ReviewItem";
import { getProductFeedbacks } from "../../api";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductReviews = async () => {
      try {
        const response = await getProductFeedbacks(productId);
        setReviews(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProductReviews();
  }, [productId]);

  return (
    <div className="ReviewList container-fluid mt-3 mb-3">
      <div className="row justify-content-start">
        <h4 className="mb-4">Customer Reviews</h4>

        {/* Display reviews or a fallback message */}
        {!loading && reviews.length === 0 && (
          <div className="mt-auto mb-auto m-auto justify-content-center align-items-center">
            <p className="mt-auto mb-auto d-flex justify-content-center align-items-center text-light">
              No Reviews Yet for this product...
            </p>
          </div>
        )}

        {/* Map reviews */}
        {!loading &&
          reviews.map((item) => (
            <ReviewItem key={item.feedBackId} item={item} />
          ))}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ReviewList;
