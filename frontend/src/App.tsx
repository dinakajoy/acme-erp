import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import SignIn from './components/auth/Signin';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Clients from './components/Clients';
import Jobs from './components/Jobs';
import Accounts from './components/Accounts';
import Root from './components/Root';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "employees",
    element: <Employees />,
  },
  {
    path: "clients",
    element: <Clients />,
  },
  {
    path: "jobs",
    element: <Jobs />,
  },
  {
    path: "accounts",
    element: <Accounts />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
