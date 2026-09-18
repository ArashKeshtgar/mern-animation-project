import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { createProduct } from '../../actions/productActions';
import { placeholderImage } from '../../utils/placeholderImage';

const SellProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state => state.errors);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: 10,
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('/api/categories').then(res => {
      setCategories(res.data);
      if (res.data.length) setFormData(f => ({ ...f, category: res.data[0]._id }));
    }).catch(() => {});
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);

    if (imageFile) {
      data.append('image', imageFile);
    } else {
      const fallback = formData.imageUrl || placeholderImage(formData.title || 'Product');
      data.append('imageUrl', fallback);
    }

    try {
      await dispatch(createProduct(data));
      setSuccess(true);
      setTimeout(() => navigate('/my-listings'), 1500);
    } catch {
      // error already dispatched to state.errors
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container py-5 text-center">
        <motion.div style={{ fontSize: '3rem' }} initial={{ scale: 0 }} animate={{ scale: 1 }}>✅</motion.div>
        <h2 className="mt-3">Listing created!</h2>
        <p className="text-muted">Taking you to your listings...</p>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 560 }}>
      <h1 className="mb-4">Sell a Product</h1>
      {errors.errors && (
        <div className="alert alert-danger">
          {errors.errors.map((e, i) => <div key={i}>{e.msg}</div>)}
        </div>
      )}
      <form onSubmit={onSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={formData.title} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={onChange} required />
        </div>
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Price ($)</label>
            <input type="number" step="0.01" min="0" className="form-control" name="price" value={formData.price} onChange={onChange} required />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Stock</label>
            <input type="number" min="0" className="form-control" name="stock" value={formData.stock} onChange={onChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={formData.category} onChange={onChange} required>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image (optional)</label>
          <input type="file" accept="image/*" className="form-control" onChange={e => setImageFile(e.target.files[0])} />
          <small className="text-muted">Leave empty to use a generated placeholder image.</small>
        </div>
        <motion.button type="submit" className="btn btn-primary w-100" whileTap={{ scale: 0.97 }} disabled={submitting}>
          {submitting ? 'Publishing...' : 'Publish Listing'}
        </motion.button>
      </form>
    </div>
  );
};

export default SellProduct;
