import DashboardHeader from "./components/DashboardHeader";
import WelcomeSection from "./components/WelcomeSection";
import UpcomingEvents from "./components/UpcomingEvents";
import StatsCards from "./components/StatsCards";
import ResponsiveSidebar from "./components/ResponsiveSidebar";

function App() {
  return (
    <>
      <div className="flex bg-gray-100">
        {/* Sidebar */}
        <ResponsiveSidebar />
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <DashboardHeader />

          <div className="flex h-full">
            {/* Main Dashboard */}
            <div className="flex-1 p-6">
              {/* Welcome Section */}
              <WelcomeSection />

              {/* Stats Cards */}
              <StatsCards />

              {/* Timetable and Upcoming Events */}
              <div className="grid grid-cols-2 gap-6">
                {/* Timetable */}

                {/* Upcoming Events */}
                <UpcomingEvents />
                <UpcomingEvents />
              </div>
            </div>
            {/* Right Sidebar */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
