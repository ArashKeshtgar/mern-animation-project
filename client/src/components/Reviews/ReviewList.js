import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../actions/reviewActions';

const ReviewList = ({ productId }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state.reviews);

  useEffect(() => {
    dispatch(getReviews(productId));
  }, [dispatch, productId]);

  if (!reviews.length) return <p className="text-muted">No reviews yet.</p>;

  return (
    <ul className="list-group">
      {reviews.map(review => (
        <li key={review._id} className="list-group-item">
          <strong>{review.user?.name || 'Anonymous'}</strong> — {review.score}/5
          {review.comment && <p className="mb-0 mt-1">{review.comment}</p>}
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
