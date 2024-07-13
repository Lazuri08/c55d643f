import React from 'react';
import { Link } from 'react-router-dom';
import inboundIcon from '../assest/icons/inbound.png';
import outboundIcon from '../assest/icons/outbound.png';
import archiveIcon from '../assest/icons/archive.png';
import moment from 'moment';


const ActivityFeed = ({ calls, onArchive, onArchiveAll, onSelectCall }) => {

  const groupCallsByDate = (calls) => {
    return calls.reduce((acc, call) => {
      const date = moment(call.created_at).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(call);
      return acc;
    }, {});
  };

  const sortedCalls = calls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const groupedCalls = groupCallsByDate(sortedCalls);

  const renderCalls = () => {
    return Object.keys(groupedCalls).map(date => (
      <div key={date}>
        <div className="date-separator">{moment(date).format('MMMM Do YYYY')}</div>
        {groupedCalls[date].map(call => (
          <div key={call.id} className="activity-item">
            <div className="call-icon">
              {call.direction === 'inbound' && <img src={inboundIcon} alt="Inbound icon" />}
              {call.direction === 'outbound' && <img src={outboundIcon} alt="Outbound icon" />}
            </div>
            <div className="call-details">
              <span className="call-from">{call.from}</span><span>tried to call</span>&nbsp;<span className="call-to">{call.to}</span>
              <div className="call-time">{moment.utc(call.created_at).local().format('hh:mm A')}</div>
            </div>
            <div className="call-actions">
              <Link to={`/activity/${call.id}`} onClick={() => onSelectCall(call.id)}>
                <button className="details-button">Details</button>
              </Link>
              <button className="archive-button" onClick={(e) => { e.stopPropagation(); onArchive(call.id); }}>Archive</button>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="activity-feed">
      <h2 className="h2">Activity Feed</h2>
      <button className="archive-all-button" onClick={onArchiveAll}>
      <img src={archiveIcon} alt="Archive icon" className="archive-icon" />
        Archive all calls
      </button>
      <div>{renderCalls()}</div>
    </div>
  );
};

export default ActivityFeed;
