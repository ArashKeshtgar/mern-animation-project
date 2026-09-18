import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import { motion } from 'framer-motion';
import './LoginForm.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(state => state.errors);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  React.useEffect(() => {
    if (isAuthenticated) navigate('/products');
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-page">
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1>Login</h1>
      {errors.errors && (
        <div className="alert alert-danger">
          {errors.errors.map((e, i) => <div key={i}>{e.msg}</div>)}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            id="email"
            className="form-control input-field"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            id="password"
            className="form-control input-field"
            placeholder="Enter your password"
            required
            minLength="6"
          />
        </div>

        <motion.button
          type="submit"
          className="btn btn-primary fixed-button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="button-text"
            animate={
              isHovered
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    color: ['#fff', '#ffcc00', '#FFC300', '#ffcc00', '#fff']
                  }
                : { rotate: 0, color: '#fff' }
            }
            transition={{
              duration: 0.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut'
            }}
          >
            Login
          </motion.span>
        </motion.button>
      </form>
      <p className="mt-3">No account? <Link to="/register">Register</Link></p>
    </motion.div>
    </div>
  );
};

export default Login;
