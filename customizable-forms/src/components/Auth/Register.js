import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/auth.css';

const RegisterForm = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5"> {/* Adjusted column classes for better alignment */}
          <div className="card border-0 rounded-4 shadow-lg custom-card"> {/* Added custom-card for custom styling */}
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4 text-dark fw-bold">Create Your Account</h3>
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="fullname" className="form-label text-muted fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="fullname"
                    placeholder="Enter your full name"
                  />
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
                  />
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
                  />
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
                  />
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