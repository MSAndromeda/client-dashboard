import DashboardHeader from "./components/DashboardHeader";
import WelcomeSection from "./components/WelcomeSection";
import UpcomingEvents from "./components/UpcomingEvents";
import StatsCards from "./components/StatsCards";
import ResponsiveSidebar from "./components/ResponsiveSidebar";
import HomeWorkProgress from "./components/HomeWorkProgress";
import Timetable from "./components/Timetable";

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

          <div className="flex flex-col lg:flex-row h-fit">
            {/* Main Dashboard */}
            <div className="flex-1 px-6 pt-6">
              {/* Welcome Section */}
              <WelcomeSection />

              {/* Stats Cards */}
              <StatsCards />

              {/* Timetable and Upcoming Events */}
              <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4">
                {/* Timetable */}
                <Timetable />

                {/* Upcoming Events */}
                <UpcomingEvents />
              </div>
            </div>
            {/* Right Sidebar */}
            <HomeWorkProgress />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
