import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from './service/Uri';
import NotFoundPage from './NotFoundPage';

export const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return setIsValid(false);

      try {
        const res = await axios.get(`${BaseUrl}/super-admin/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status === 200) {
          localStorage.setItem('admin', JSON.stringify(res.data.data));
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };
    verifyToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  return isValid ? children : <Navigate to="/admin/login" />;
};

export const CompanyPrivateRoute = ({ children, type="driver", authentication=true }) => {
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('companyToken');
      const role = localStorage.getItem('companyRole');

      if(!authentication &&  (token && role)) {
        if (role === "driver") {
          setIsValid(true);
          return navigate('/driver');
        } else if (role === "hotel") {
          setIsValid(true);
          return navigate('/hotel');
        }
      }

      if (authentication && (!token || !role)) {
        setIsValid(true);
        return navigate('/');
      };

      if (!token || !role) {
        setIsValid(true);
        return navigate('/');
      }

      if( type === "driver" && role !== "driver") {
        return setIsValid(false);
      } else if (type === "hotel" && role !== "hotel") {
        return setIsValid(false);
      }

      let verifyUrl = '';
      if (role === 'hotel') {
        verifyUrl = `${BaseUrl}/company/verify-company`;
      } else if (role === 'driver') {
        verifyUrl = `${BaseUrl}/driver/verify-driver`;
      } else {
        return setIsValid(false);
      }

      try {
        const res = await axios.get(verifyUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status === 200) {
          setIsValid(true);
          localStorage.setItem('company', JSON.stringify(res.data.data));
        } else {
          setIsValid(false);
        }
      } catch {
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  return isValid ? children : <NotFoundPage/>;

};
