import React from 'react';
import './CardComponent.css'; // Assume you have a corresponding CSS file for styles

async function getPollen()

const CardComponent = ({ title, unit }) => {
  return (
    <div className="card">
      <div className="card-icon">
        {/* Replace "icon-name" with the actual icon you wish to use */}
        <i className="icon-name"></i>
      </div>
      <div className="card-content">
        <div className="card-data-placeholder">----</div>
        <div className="card-data-unit">{unit}</div>
      </div>
      <div className="card-footer">
        Enter in your {title}
      </div>
    </div>
  );
};

export default CardComponent;
