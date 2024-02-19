import React from 'react';

const InstructorCard = ({ instructor }) => {
  return (
    <div className="instructor-card">
      <img src={instructor.instructorImage} alt={instructor.instructorName} />
      <div className="instructor-details">
        <h2>{instructor.instructorName}</h2>
        <p>Price per hour: {instructor.pricePerHour}</p>
        <p>Academy: {instructor.academyName}</p>
        <p>Latitude: {instructor.latitude}</p>
        <p>Longitude: {instructor.longitude}</p>
        <p>Certified: {instructor.cert ? 'Yes' : 'No'}</p>
        <p>Distance: {instructor.distance}</p>
        <p>Average Rating: {instructor.averageRating}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
