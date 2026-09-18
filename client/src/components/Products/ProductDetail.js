import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getProduct } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import ReviewList from '../Reviews/ReviewList';
import AddReview from '../Reviews/AddReview';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.products);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const onAddToCart = () => {
    dispatch(addToCart(product, quantity));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (loading || !product) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <motion.div
          className="col-md-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={product.imageUrl} alt={product.title} className="img-fluid rounded shadow-sm" />
        </motion.div>
        <motion.div
          className="col-md-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="badge bg-secondary mb-2">{product.category?.name}</span>
          <h1>{product.title}</h1>
          <h3 className="my-3" style={{ color: 'var(--voltra-accent-dark)' }}>
            ${product.price.toFixed(2)}
          </h3>
          <p>{product.description}</p>
          <div className="d-flex align-items-center gap-2 mb-3">
            <input
              type="number"
              min="1"
              className="form-control"
              style={{ width: 80 }}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            />
            <motion.button
              className={`btn ${added ? 'btn-success' : 'btn-primary'}`}
              whileTap={{ scale: 0.95 }}
              onClick={onAddToCart}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={added ? 'added' : 'add'}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                >
                  {added ? 'Added to Cart ✓' : 'Add to Cart'}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <hr className="my-5" />
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-3">Reviews</h3>
          {isAuthenticated && <AddReview productId={product._id} />}
          <ReviewList productId={product._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
