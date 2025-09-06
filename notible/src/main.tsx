import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Revise from './screens/Revise.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {   
        path: "/",
        element: <App />
    },
    {
        path: "/Revise",
        element: <Revise />
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)

