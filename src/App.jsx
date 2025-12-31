import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/approuter.jsx';

import { ThemeProvider } from './context/ThemeContext.jsx';
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <div className=''>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  )

}
export default App;
