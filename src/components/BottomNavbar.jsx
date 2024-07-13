import React from "react";
import { Link } from "react-router-dom";
import callsIcon from "../assest/icons/phone-call.png";
import contactsIcon from "../assest/icons/user.png";
import dialpadIcon from "../assest/icons/dialpad.png";
import settingsIcon from "../assest/icons/setting.png";
import voicemailIcon from "../assest/icons/voice-mail.png";

const BottomNavbar = ({ callCount }) => {
  return (
    <div className="bottom-navbar">
      <Link to="/" className="nav-item" style={{ position: "relative" }}>
        <img src={callsIcon} alt="Calls" className="nav-icon" />
        {callCount > 0 && <span className="call-count-badge">{callCount}</span>}
      </Link>
      <Link to="/" className="nav-item">
        <img src={contactsIcon} alt="Contacts" className="nav-icon" />
      </Link>
      <Link to="/" className="nav-item dialpad">
        <img src={dialpadIcon} alt="Dialpad" className="nav-icon" />
      </Link>
      <Link to="/" className="nav-item">
        <img src={settingsIcon} alt="Settings" className="nav-icon" />
      </Link>
      <Link to="" className="nav-item">
        <img src={voicemailIcon} alt="Voicemail" className="nav-icon" />
      </Link>
    </div>
  );
};

export default BottomNavbar;
