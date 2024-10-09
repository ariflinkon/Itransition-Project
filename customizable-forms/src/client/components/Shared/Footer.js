import React from 'react';

const Footer = () => {
  return (
    <footer className="text-light text-center d-flex align-items-center justify-content-center" style={{ minHeight: '60px', backgroundColor: '#343a40' }}>
      <div className="p-3">
        <small>&copy; {new Date().getFullYear()} Dev. Arif Jahan Linkon. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;