import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "src/layouts/MainLayout";
import LoginView from "src/views/auth/LoginView";
import LogoutView from "src/views/auth/LogoutView";
import RegistrationView from "src/views/auth/RegistrationView";
import TodayDashboardView from "src/views/dashboard/TodayDashboardView";
import NotFoundView from "src/views/errors/NotFoundView";

const navbar_items = [
  {
    href: "/dashboard",
    icon: DashboardIcon,
    title: "Today",
  },
];

const routes = [
  // auth
  { path: "login", element: <LoginView /> },
  { path: "logout", element: <LogoutView /> },
  { path: "registration", element: <RegistrationView /> },

  // application specific
  {
    path: "/",
    element: <MainLayout sideNavs={navbar_items} />,
    children: [
      { path: "dashboard", element: <TodayDashboardView /> },

      // landing page, default to dashboard
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "404", element: <NotFoundView /> },
      // catch all, 404
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
