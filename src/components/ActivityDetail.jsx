import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityDetail } from '../api';

const ActivityDetail = () => {
  const [activity, setActivity] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  const fetchActivityDetail = async () => {
    try {
      const response = await getActivityDetail(id);
      setActivity(response.data);
    } catch (error) {
      console.error('Error fetching activity detail:', error);
    }
  };

  if (!activity) return <div>Loading...</div>;

  return (
    <div className="activity-feed">
      <h2 className="archived-title">Activity Detail</h2>
      <div className="activity-detail">
        <p>From: {activity.from}</p>
        <p>To: {activity.to}</p>
        <p>Direction: {activity.direction}</p>
        <p>Duration: {activity.duration} seconds</p>
        <p>Call Type: {activity.call_type}</p>
        <p>Archived: {activity.is_archived ? 'Yes' : 'No'}</p>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
};

export default ActivityDetail;
