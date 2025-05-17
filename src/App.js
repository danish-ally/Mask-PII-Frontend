import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [maskedImg, setMaskedImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:8000/upload/', formData, {
        responseType: 'blob'
      });

      setMaskedImg(URL.createObjectURL(res.data));
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="app-card">
        <header className="header">
          <img src="https://img.icons8.com/ios-filled/100/shield.png" alt="Shield Icon" />
          <h1>PII Masking Tool</h1>
          <p>Upload Aadhaar images securely and get sensitive info masked in seconds.</p>
        </header>

        <label className="upload-btn">
          Upload Aadhaar Image
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>

        {loading && <p className="status">🔐 Processing image...</p>}

        {maskedImg && (
          <div className="result">
            <img src={maskedImg} alt="Masked Aadhaar" className="fade-in" />
            <a href={maskedImg} download="masked_aadhaar.png">📥 Download Masked Image</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
