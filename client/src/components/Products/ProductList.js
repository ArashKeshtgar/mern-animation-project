import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { getProducts } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const { products, loading } = useSelector(state => state.products);
  const [categories, setCategories] = useState([]);
  const [justAdded, setJustAdded] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    dispatch(getProducts(category));
  }, [dispatch, category]);

  const onAddToCart = (product) => {
    dispatch(addToCart(product));
    setJustAdded(product._id);
    setTimeout(() => setJustAdded(null), 1200);
  };

  const onFilter = (id) => {
    if (id) setSearchParams({ category: id });
    else setSearchParams({});
  };

  const visibleProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h1 className="mb-0">Products</h1>
        <input
          type="search"
          className="form-control"
          style={{ maxWidth: 260 }}
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="d-flex gap-2 flex-wrap mb-4">
        <button
          className={`btn btn-sm ${!category ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onFilter('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            className={`btn btn-sm ${category === cat._id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onFilter(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : !visibleProducts.length ? (
        <p className="text-muted">No products match your search.</p>
      ) : (
        <div className="row g-4">
          {visibleProducts.map((product, i) => (
            <motion.div
              key={product._id}
              className="col-md-4 col-lg-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: 200, objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {product.description.slice(0, 80)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>${product.price.toFixed(2)}</strong>
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-sm btn-outline-secondary"
                      onClick={e => e.stopPropagation()}
                    >
                      View Details
                    </Link>
                  </div>
                  <motion.button
                    className={`btn btn-sm w-100 ${justAdded === product._id ? 'btn-success' : 'btn-primary'}`}
                    whileTap={{ scale: 0.95 }}
                    onClick={e => { e.stopPropagation(); onAddToCart(product); }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={justAdded === product._id ? 'added' : 'add'}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                      >
                        {justAdded === product._id ? 'Added ✓' : 'Add to Cart'}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
