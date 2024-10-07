import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center d-flex align-items-center justify-content-center" style={{ minHeight: '50px' }}>
      <div className="p-3">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;