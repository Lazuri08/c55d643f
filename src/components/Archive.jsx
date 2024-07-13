import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import inboundIcon from '../assest/icons/inbound.png';
import outboundIcon from '../assest/icons/outbound.png';
import archiveIcon from '../assest/icons/archive.png';
import menuIcon from '../assest/icons/menu.png';



const Archive = ({ calls, onUnarchive, onUnarchiveAll, onSelectCall }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onMenuOpen =() =>{
    setMenuOpen(!menuOpen)
    // console.log(menuOpen)
  }
  const getCallIcon = (direction) => {
    if (direction === 'inbound') {
      return inboundIcon;
    } else if (direction === 'outbound') {
      return outboundIcon;
    }
    return null;
  };

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
        <div className="date-separator">{moment(date).format('----------------- MMMM, DD, YYYY -----------------').toUpperCase()}</div>
        {groupedCalls[date].map(call => (
          <div className="activity-item-container"><div key={call.id} className="activity-item">
            <div className="call-icon">
              {call.direction === 'inbound' && <img src={inboundIcon} alt="Inbound icon" />}
              {call.direction === 'outbound' && <img src={outboundIcon} alt="Outbound icon" />}
            </div>
            <div className="call-details">
              <div>
                <div>
                  <span className="call-from">{call.from}</span>
                  </div>
                  <div className="call-to">
                    <span>tried to call</span>&nbsp;<span >{call.to}</span>
                    </div>
              </div>
                
              <div className="call-time">{moment.utc(call.created_at).local().format('hh:mm')}</div>
              
              <div className="am-pm">{moment.utc(call.created_at).local().format('A')}</div>
              <div className=" menu-div" onClick={onMenuOpen}>
                  <img src={menuIcon} alt="menu icon" className="menu-icon" />
                  </div>
                 
            </div>

            {/* {menuOpen && (
                    <div>
              <Link to={`/activity/${call.id}`} onClick={() => onSelectCall(call.id)}>
                <button className="details-button">Details</button>
              </Link>
              <button className="archive-button" onClick={(e) => { e.stopPropagation(); onArchive(call.id); }}>Archive</button>
              </div>)} */}
            </div>
            <div>{menuOpen && (
                    <div className="button-container">
              <Link to={`/activity/${call.id}`} style={{ textDecoration: 'none' }} onClick={() => onSelectCall(call.id)}>
                <button className="details-button">Details</button>
              </Link>
              <button className="archive-button" onClick={(e) => { e.stopPropagation(); onArchive(call.id); }}>Archive</button>
              </div>)}</div>
            </div>
          
          
        ))}
        
      </div>
    ));
  };
  return (
    <div className="activity-feed">
      <h2 className="archived-title">Archived Calls</h2>
      <div className="archive-all-container" onClick={onUnarchiveAll}>
      <img src={archiveIcon} alt="Archive icon" className="archive-icon" />

        Unarchive all calls
      </div>
      <div>{renderCalls()}</div>
    </div>
  );
};

export default Archive;