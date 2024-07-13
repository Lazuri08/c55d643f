
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ActivityFeed from '../src/components/ActivityFeed.jsx';
import Archive from '../src/components/Archive.jsx';
import ActivityDetail from '../src/components/ActivityDetail.jsx';
import CallDetails from '../src/components/CallDetails.jsx';
// import Contacts from '../src/components/Contacts.jsx';
import Dialpad from '../src/components/Dialpad.jsx';
import Settings from '../src/components/Settings.jsx';
import Voicemail from '../src/components/Voicemail.jsx';
import Header from '../src/Header.jsx';
import BottomNavbar from '../src/components/BottomNavbar.jsx';
import { getActivities, updateActivity } from '../src/api';
import moment from 'moment/moment.js';


const App = () => {
  const [calls, setCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [showContacts, setShowContacts] = useState(false);


  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const calls = [
      {"direction":"inbound","from":1,"to":2,"via":1,"duration":0,"is_archived":false,"call_type":"answered","id":"6685a0df24a7a79ae0c50f8f","created_at":"2024-07-03T19:05:03.506Z"},
      {"direction":"outbound","from":2,"to":1,"via":1,"duration":0,"is_archived":false,"call_type":"answered","id":"6685b79524326ad725d48041","created_at":"2024-07-03T20:41:57.436Z"}
      // {"direction":"outbound","from":1,"to":2,"via":1,"duration":0,"is_archived":false,"call_type":"answered","id":"6685a0df24a7a79ae0c50f84","created_at":"2024-09-04T19:05:03.506Z"},
      // {"direction":"inbound","from":2,"to":1,"via":1,"duration":0,"is_archived":false,"call_type":"answered","id":"6685b79524326ad725d48042","created_at":"2024-10-03T20:41:57.436Z"},// extra data to check if sorting and inbound-outbound icon works
      // {"direction":"outbound","from":1,"to":2,"via":1,"duration":0,"is_archived":false,"call_type":"answered","id":"6685a0df24a7a79ae0q50f84","created_at":"2024-07-03T19:06:03.506Z"},
    ]
    
  const sortedCalls = calls.sort((a, b) => (a.created_at) - (b.created_at));
    console.log(sortedCalls);
    setCalls(sortedCalls);

      // const response = await getActivities();
      // console.log(JSON.stringify(response.data))
      // setCalls(response.data);
    } catch (error) {
      console.error('Error fetching calls:', error);
    }
  };

  const archiveCall = async (id) => {
    try {
      await updateActivity(id, { is_archived: true });
      setCalls(calls.map(call => call.id === id ? { ...call, is_archived: true } : call));
    } catch (error) {
      console.error('Error archiving call:', error);
    }
  };

  const unarchiveCall = async (id) => {
    try {
      await updateActivity(id, { is_archived: false });
      setCalls(calls.map(call => call.id === id ? { ...call, is_archived: false } : call));
    } catch (error) {
      console.error('Error unarchiving call:', error);
    }
  };

  const archiveAll = async () => {
    try {
      for (const call of calls) {
        await updateActivity(call.id, { is_archived: true });
      }
      setCalls(calls.map(call => ({ ...call, is_archived: true })));
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  const unarchiveAll = async () => {
    try {
      for (const call of calls) {
        await updateActivity(call.id, { is_archived: false });
      }
      setCalls(calls.map(call => ({ ...call, is_archived: false })));
    } catch (error) {
      console.error('Error unarchiving all calls:', error);
    }
  };

  const onSelectCall = (call) => {
    setSelectedCall(call);
  };

  const handleIconClick = (section) => {
  //   if (section === 'contacts') {
  //     setShowContacts(prevShowContacts => !prevShowContacts);
  //   } else {
      setActiveSection((prevSection) => (prevSection === section ? '' : section));
  //     setShowContacts(false);
    };
  

  return (
    <Router>
      <div>
        
          <>
            <nav className='nav'>
                
              {/* <Link to="/contacts"><Header /></Link> */}
              <Link to="/">Inbox </Link>
              <Link to="/archive">Archived</Link>
            </nav>
            <Routes>
              <Route path="/" element={
                <ActivityFeed
                  calls={calls.filter(call => !call.is_archived)}
                  onArchive={archiveCall}
                  onArchiveAll={archiveAll}
                  onSelectCall={onSelectCall}
                />
              } />
              <Route path="/archive" element={
                <Archive
                  calls={calls.filter(call => call.is_archived)}
                  onUnarchive={unarchiveCall}
                  onUnarchiveAll={unarchiveAll}
                  onSelectCall={onSelectCall}
                />
              } />
              <Route path="/activity/:id" element={<ActivityDetail call={selectedCall} />} />
              <Route path="/dialpad" element={<Dialpad />} />
              {/* <Route path="/contacts" element={<Contacts />} /> */}
            </Routes>
            {activeSection === 'callDetails' && <CallDetails calls={calls} />}
            {activeSection === 'settings' && <Settings />}
            {activeSection === 'voicemail' && <Voicemail />}
          </>
                <BottomNavbar
          callCount={calls.length}
          onCallsIconClick={() => {}}
          onContactsIconClick={() => {} }
          onDialpadIconClick={() => {}}
          onSettingsIconClick={() => {}}
          onVoicemailIconClick={() => {}}
        />
      </div>
    </Router>
  );
};

export default App;