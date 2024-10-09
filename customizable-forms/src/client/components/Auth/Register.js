import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/auth.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.fullname,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful', data);
          // Handle successful registration (e.g., redirect to login page)
        } else {
          const errorData = await response.json();
          console.error('Registration failed', errorData);
          // Handle registration failure (e.g., display error message)
        }
      } catch (error) {
        console.error('Error submitting form', error);
        // Handle network or other errors
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 rounded-4 shadow-lg custom-card">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4 text-dark fw-bold">Create Your Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="fullname" className="form-label text-muted fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="fullname"
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label text-muted fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label text-muted fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="form-label text-muted fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill custom-btn">
                  Register
                </button>
              </form>
              <div className="text-center mt-4">
                <span className="text-secondary">Already have an account? </span>
                <a href="login" className="text-decoration-none text-primary fw-bold">
                  Login
                </a>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-outline-secondary w-100 btn-lg rounded-pill custom-google-btn">
                  <i className="fab fa-google me-2"></i> Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;