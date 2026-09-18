import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser } from '../../actions/authActions';
import './LoginForm.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state => state.errors);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }, navigate));
  };

  return (
    <div className="auth-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>Create Account</h1>
        {errors.errors && (
          <div className="alert alert-danger">
            {errors.errors.map((e, i) => <div key={i}>{e.msg}</div>)}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={onChange} className="form-control input-field" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={onChange} className="form-control input-field" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} className="form-control input-field" placeholder="At least 6 characters" required minLength="6" />
          </div>
          <motion.button type="submit" className="btn btn-primary fixed-button w-100" whileTap={{ scale: 0.95 }}>
            Register
          </motion.button>
        </form>
        <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
      </motion.div>
    </div>
  );
};

export default Register;
