import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ClientDetails from "./pages/ClientDetails.jsx";
import Timetable from "./pages/Timetable.jsx";
import PaidClients from "./pages/PaidClients.jsx";
import ClientFollowUp from "./pages/ClientFollowUp.jsx";
import ClientAquesitionStats from "./pages/ClientAquesitionStats.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/clientdetails", element: <ClientDetails /> },
      { path: "/timetable", element: <Timetable /> },
      { path: "/paidclients", element: <PaidClients /> },
      { path: "/clientfollowup", element: <ClientFollowUp /> },
      { path: "/clientaquestionstats", element: <ClientAquesitionStats /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
