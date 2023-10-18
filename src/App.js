// src/App.js

import React, { useState } from 'react';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [OTP, setOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleSendOTP = () => {
    // Simulating sending OTP to the server
    fetch('http://localhost:3001/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: phoneNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVerificationStatus({ success: true, message: 'OTP sent successfully' });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleVerifyOTP = () => {
    fetch('http://localhost:3001/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp:OTP }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVerificationStatus(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>

      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={OTP}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </div>

      {verificationStatus && (
        <div>
          {verificationStatus.success
            ? <p style={{ color: 'green' }}>{verificationStatus.message}</p>
            : <p style={{ color: 'red' }}>{verificationStatus.message}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
