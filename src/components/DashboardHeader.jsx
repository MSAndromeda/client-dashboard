import { Search, Bell } from "lucide-react";
const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 my-2 mr-2 sm:mr-4 rounded-lg ml-16 lg:ml-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 md:w-110 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
            <Bell size={24} strokeWidth={1.5} className="text-orange-600" />
          </button>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div>
              <img
                className="w-10 h-10 border-2 border-gray-200 rounded-full"
                src="https://i.pravatar.cc/300"
                alt=""
              />
            </div>
            <div className="flex-col hidden md:flex">
              <span className="text-base font-medium text-gray-900">
                Your Name Here
              </span>
              <span className="text-xs text-gray-700">UserName_Here</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
