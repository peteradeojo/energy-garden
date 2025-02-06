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
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import Notifications from './pages/Notifications.jsx';
import GardenLayout from './layouts/GardenLayout.jsx';
import Garden from './pages/Garden.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AuthLayout />}>
        <Route element={<AppLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route element={<GardenLayout />}>
          <Route path="/garden/:id" element={<Garden />} />
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
