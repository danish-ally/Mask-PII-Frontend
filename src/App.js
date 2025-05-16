import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // 👈 Import custom CSS

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
    <div className="container">
      <div className="card">
        <h2>Mask PII from Aadhaar</h2>

        <label className="upload-btn">
          Select Image
          <input type="file" onChange={handleUpload} hidden />
        </label>

        {loading && <p className="status">Processing image...</p>}

        {maskedImg && (
          <div className="result">
            <img src={maskedImg} alt="Masked Aadhaar" />
            <a href={maskedImg} download="masked_aadhaar.png">Download Image</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
