// import React from 'react';
// import ReactDOM from 'react-dom'
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' instead of 'react-dom'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root using 'createRoot'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

