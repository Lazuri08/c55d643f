import React from "react";
// You can update this code for Call Details Icon on the Bottom NavBar
const CallDetails = ({ calls }) => {
  return (
    <div className="call-details-container">
      <h2>Call Details</h2>
      <ul>
        {calls.map((call) => (
          <li key={call.id} className="call-details-item">
            <p>
              <strong>Direction:</strong> {call.direction}
            </p>
            <p>
              <strong>From:</strong> {call.from}
            </p>
            <p>
              <strong>Archived:</strong> {call.is_archived ? "Yes" : "No"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CallDetails;
