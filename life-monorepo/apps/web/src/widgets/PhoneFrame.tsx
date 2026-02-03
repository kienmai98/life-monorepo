import React from 'react';
import './PhoneFrame.css';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="phone-frame">
      <div className="phone-screen">
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
