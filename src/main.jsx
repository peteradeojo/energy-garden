import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router';
import AuthLayout from './layouts/AuthLayout.jsx';
import Login from './pages/Login.jsx';

import store from './store.js';
import { Provider } from 'react-redux';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import GardenLayout from './layouts/GardenLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AuthLayout />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<GardenLayout />}>
          
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
