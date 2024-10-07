import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 rounded-4 shadow">
            <div className="card-body p-5">
              <div className="text-center">
              </div>
              <h3 className="card-title text-center mb-4 text-dark">Welcome Back</h3>
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-pill"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill shadow-sm">
                  Login
                </button>
              </form>
              <div className="text-center mt-4">
                <a href="#" className="text-decoration-none text-primary">
                  Forgot your password?
                </a>
              </div>
              <div className="text-center mt-4">
                <span className="text-secondary">Don't have an account? </span>
                <a href="register" className="text-decoration-none text-primary fw-bold">
                  Register
                </a>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-outline-secondary w-100 btn-lg rounded-pill">
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;