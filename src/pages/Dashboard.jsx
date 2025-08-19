import WelcomeSection from "../components/Home/WelcomeSection";
import StatsCards from "../components/Home/StatsCards";
import Timetable from "../components/Home/Timetable";
import UpcomingEvents from "../components/Home/UpcomingEvents";
import HomeWorkProgress from "../components/Home/HomeWorkProgress";

const Dashboard = () => {
  return (
    <>
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
    </>
  );
};

export default Dashboard;
