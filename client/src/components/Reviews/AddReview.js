import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../actions/reviewActions';

const AddReview = ({ productId }) => {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addReview({ productId, score, comment }));
    setComment('');
  };

  return (
    <form onSubmit={onSubmit} className="mb-4">
      <div className="row g-2 align-items-end">
        <div className="col-auto">
          <label className="form-label">Rating</label>
          <select className="form-select" value={score} onChange={e => setScore(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Comment</label>
          <input
            className="form-control"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your thoughts..."
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddReview;
