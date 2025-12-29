import { createBrowserRouter } from "react-router-dom";

import React from 'react'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
]);

const approuter = () => {
  return (
    <div>approuter</div>
  )
}
