import { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { BaseUrl } from "../service/Uri";
import { FaCalendarAlt, FaDownload, FaEye, FaUsers } from 'react-icons/fa';
import CommonHeader from './CommonHeader';
import AddVisitorFieldModal from './AddVisitorFieldModal';
import { BiCoinStack } from "react-icons/bi";

const Drivers = ({ toggleSidebar, setCurrentPage ,isOpen}) => {
 const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
   const company = JSON.parse(localStorage.getItem('company'));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const token = localStorage.getItem('companyToken');
  const fetchVisitors = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/visitor/hotel/coins`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 200) {
        setVisitors(res.data.data);
      } else {
        console.error("Failed to fetch visitors:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (visitorId) => {
  try {
    const res = await axios.put(`${BaseUrl}/visitor/hotel/accept/${visitorId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.status === 200) {
      const updated = res.data.data;
      // Replace updated visitor in the list
      setVisitors((prev) =>
        prev.map((v) => (v._id === visitorId ? updated : v))
      );
    }
  } catch (error) {
    console.error("Failed to accept driver:", error);
  }
};

  useEffect(() => {
    fetchVisitors();
  }, []);


  return (
    <div className="container-fluid p-0">
      <CommonHeader title="Drivers" company={company} toggleSidebar={toggleSidebar} setCurrentPage={setCurrentPage} />

      <div className="card border-0 shadow-sm my-4"
              style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h3 className="text-white mb-1 fw-bold">
                    <BiCoinStack className="me-2" />coins Management
                  </h3>
                  {/* <p className="text-white-50 mb-0">List of visitors submitted by this driver</p> */}
                </div>
              </div>
            </div>
      
            {/* Visitor Table */}
            <div className="card border-0">
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-3 text-muted">Loading visitors...</p>
                  </div>
                ) : visitors.length === 0 ? (
                  <div className="text-center py-5">
                    <FaEye size={48} className="text-muted mb-3" />
                    <p className="text-muted">No Entry found</p>
                  </div>
                ) : (
                  <div
                    className="table-responsive"
                    style={{
                      maxWidth: isMobile
                        ? 'calc(100vw - 32px)'
                        : isOpen
                        ? 'calc(100vw - 312px)'
                        : 'calc(100vw - 123px)',
                      overflowX: 'auto'
                    }}
                  >
                    <table className="table table-hover mb-0">
                      <thead style={{ background: 'linear-gradient(45deg, #f8f9ff, #e3f2fd)' }}>
                        <tr>
                          <th className="fw-bold px-3 py-3 text-primary">Company Name</th>
                          <th className="fw-bold px-3 py-3 text-primary">Company Email</th>
                          <th className="fw-bold px-3 py-3 text-primary">Mobile</th>
                          <th className="fw-bold px-3 py-3 text-primary">Licence No.</th>
                          <th className="fw-bold px-3 py-3 text-primary">Vehicle No.</th>
                          <th className="fw-bold px-3 py-3 text-primary">Status</th>
                          <th className="fw-bold px-3 py-3 text-primary">Coins</th>
                          <th className="fw-bold px-3 py-3 text-primary text-end">Date/Time</th>
                          <th className="fw-bold px-3 py-3 text-primary text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitors.map((v, i) => (
                          <tr key={i}>
                            <td className="py-3 px-3">{v.driverId?.name || <span className="text-muted">—</span>}</td>
                            <td className="py-3 px-3">{v.driverId?.email || <span className="text-muted">—</span>}</td>
                            <td className="py-3 px-3">{v.driverId?.mobile || <span className="text-muted">—</span>}</td>
                            <td className="py-3 px-3">{v.driverId?.licenceNo || <span className="text-muted">—</span>}</td>
                            <td className="py-3 px-3">{v.driverId?.vehicleNo || <span className="text-muted">—</span>}</td>
                            <td className="py-3 px-3">
                              <span className={`badge ${v.status === "pending" ? "bg-warning" : "bg-success"}`}>
                                {v.status}
                              </span>
                            </td>
                            <td className="py-3 px-3">{v.coins}</td>
                            <td className="py-3 px-3 text-end">{new Date(v.createdAt).toLocaleString()}</td>
                            <td className="py-3 px-3 text-center">
  {v.status === "pending" ? (
    <button
      className="btn btn-sm btn-success"
      onClick={() => handleAccept(v._id)}
    >
      Accept
    </button>
  ) : (
    <span className="text-success fw-semibold">Accepted</span>
  )}
</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      };

export default Drivers;
