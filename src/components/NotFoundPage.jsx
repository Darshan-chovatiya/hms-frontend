import React from 'react';

const NotFoundPage = () => {
  const handleGoHome = () => {
    // In a real app, you'd use React Router's navigate or window.location
    console.log('Navigating to home...');
    // window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="text-center">
              {/* Large 404 Number */}
              <div className="mb-4">
                <h1 className="display-1 fw-bold text-primary mb-0" style={{fontSize: '8rem', lineHeight: '1'}}>
                  404
                </h1>
              </div>
              
              {/* Main Message */}
              <div className="mb-4">
                <h2 className="h3 fw-bold text-dark mb-3">
                  Oops! Page Not Found
                </h2>
                <p className="text-muted mb-4 fs-5">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>

              {/* Illustration/Icon */}
              <div className="mb-5">
                <div className="d-inline-block p-4 bg-primary bg-opacity-10 rounded-circle">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                
                <button 
                  onClick={handleGoBack}
                  className="btn btn-outline-secondary btn-lg px-4 py-2 fw-semibold"
                  style={{borderRadius: '8px'}}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                    <path d="M19 12H5"></path>
                    <path d="M12 19l-7-7 7-7"></path>
                  </svg>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;