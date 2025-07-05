import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../service/Uri';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaSignInAlt, FaIdCard, FaCar } from 'react-icons/fa';

const DriverSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    licenceNo: '',
    vehicleNo: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile' && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await axios.post(`${BaseUrl}/driver/signup`, formData);
      if (res.data?.data) {
        setSuccessMsg("Driver account created! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMsg(res.data.message || "Signup failed.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center p-4">
      <div className="login-overlay"></div>
      <div className="float-blob blob1"></div>
      <div className="float-blob blob2"></div>
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-5 shadow-sm" style={{ maxWidth: 500, width: '100%' }}>
        <h3 className="text-center mb-4">Driver Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" className="form-control" name="name" required value={formData.name} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label>Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input type="email" className="form-control" name="email" required value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label>Mobile</label>
            <div className="input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input type="text" className="form-control" name="mobile" required maxLength="10" pattern="^[0-9]{10}$" title="Mobile number must be 10 digits" value={formData.mobile} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Licence Number</label>
            <div className="input-group">
                <span className="input-group-text"><FaIdCard /></span>
                <input type="text" className="form-control" name="licenceNo" value={formData.licenceNo} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle Number</label>
            <div className="input-group">
                <span className="input-group-text"><FaCar /></span>
                <input type="text" className="form-control" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control" name="password" required minLength={6} value={formData.password} onChange={handleChange} />
            </div>
          </div>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <div className="d-grid">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Signing up..." : <> <FaSignInAlt className="me-2" /> Create Account </>}
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="small">
              Already have an account? <a href="/">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default DriverSignup;
