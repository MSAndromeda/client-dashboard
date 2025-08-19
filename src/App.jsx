import DashboardHeader from "./components/DashboardHeader";
import ResponsiveSidebar from "./components/ResponsiveSidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex bg-gray-100 max-w-fit m-auto">
        {/* Sidebar */}
        <ResponsiveSidebar />
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <DashboardHeader />
          <div className="flex flex-col lg:flex-row h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
