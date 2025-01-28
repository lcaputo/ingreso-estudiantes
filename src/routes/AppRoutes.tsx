import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Users from "../pages/users";
import Logout from "../pages/logout";
import Exit from "../pages/exit";
import { Scanner } from "../pages/scanner";
import Guest from "../pages/guest";
import { Success } from "../pages/success";
import { EntrySuccess } from "../pages/entry_success";
import { Entry } from "../pages/entry";
import History from "../pages/history";
import Upload from "../pages/upload";
import { Entries } from "../pages/entries";
import ValidateRoutePrivate from "./ValidateRoutePrivate";
import ValidateRoutePublic from "./ValidateRoutePublic";
import Dashboard from "../pages/dashboard";

const AppRoutes = createBrowserRouter([
  //public
  {
    path: "/",
    element: (
      <ValidateRoutePublic>
        <Login />
      </ValidateRoutePublic>
    ),
  },
  {
    path: "/login",
    element: (
      <ValidateRoutePublic>
        <Login />
      </ValidateRoutePublic>
    ),
  },

  //private
  {
    path: "/dashboard",
    element: (
      <ValidateRoutePrivate>
        <Dashboard />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/users",
    element: (
      <ValidateRoutePrivate>
        <Users />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/records",
    element: (
      <ValidateRoutePrivate>
        <Entries />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/upload",
    element: (
      <ValidateRoutePrivate>
        <Upload />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/history",
    element: (
      <ValidateRoutePrivate>
        <History />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/entry",
    element: (
      <ValidateRoutePrivate>
        <Entry />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/entry_success",
    element: (
      <ValidateRoutePrivate>
        <EntrySuccess />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/success",
    element: (
      <ValidateRoutePrivate>
        <Success />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/guest",
    element: (
      <ValidateRoutePrivate>
        <Guest />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/scanner",
    element: (
      <ValidateRoutePrivate>
        <Scanner />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/exit",
    element: (
      <ValidateRoutePrivate>
        <Exit />
      </ValidateRoutePrivate>
    ),
  },
  {
    path: "/logout",
    element: (
      <ValidateRoutePrivate>
        <Logout />
      </ValidateRoutePrivate>
    ),
  },
]);

export default AppRoutes;
