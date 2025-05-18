import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-black/30 backdrop-blur-sm shadow-lg mt-auto text-white'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0'>
          <span className='text-sm'>&copy; 2025 Badminton Academy. All rights reserved.</span>
          <div className='flex flex-wrap justify-center gap-4 text-sm'>
            <Link to="/terms-and-conditions" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link to="/cancellation-and-refund" className="hover:underline">
              Cancellation & Refund
            </Link>
            <Link to="/shipping-and-delivery" className="hover:underline">
              Shipping & Delivery
            </Link>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
