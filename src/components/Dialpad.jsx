// import React, { useState } from 'react';
// import '../css/dialpad.css'; 

// const Dialpad = () => {
//   const [input, setInput] = useState('');

//   const handleButtonClick = (value) => {
//     setInput((prevInput) => prevInput + value);
//   };

//   const handleClear = () => {
//     setInput('');
//   };

//   const handleCall = () => {
//     alert(`Calling ${input}...`);
//   };

//   return (
//     <div className="dialpad-page">
//       <div className="dialpad-display">
//         <input type="text" value={input} readOnly />
//       </div>
//       <div className="dialpad-buttons">
//         {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((value) => (
//           <button key={value} onClick={() => handleButtonClick(value)}>
//             {value}
//           </button>
//         ))}
//         <button className="dialpad-clear" onClick={handleClear}>Clear</button>
//         <button className="dialpad-call" onClick={handleCall}>Call</button>
//       </div>
//     </div>
//   );
// };

// export default Dialpad;
