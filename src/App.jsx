import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/approuter.jsx';
import { Provider } from 'react-redux';
import {store } from './api/store/store';

import { ThemeProvider } from './context/ThemeContext.jsx';
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className=''>
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </Provider>
  )

}
export default App;
