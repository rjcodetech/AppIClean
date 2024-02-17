import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <button className="btn btn-outline-secondary me-auto" onClick={handleGoBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <span className="navbar-brand" style={{ marginLeft: 'auto', marginRight: 'auto' }}>App IClean</span>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
