import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityDetail } from '../api';

const ActivityDetail = () => {
  const [activity, setActivity] = useState(null);
  const { id } = useParams();

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
    <div className="activity-detail">
      <h2>Activity Detail</h2>
      <p>From: {activity.from}</p>
      <p>To: {activity.to}</p>
      <p>Direction: {activity.direction}</p>
      <p>Duration: {activity.duration} seconds</p>
      <p>Call Type: {activity.call_type}</p>
      <p>Archived: {activity.is_archived ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ActivityDetail;
