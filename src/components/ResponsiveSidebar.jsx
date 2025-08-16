import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Clock,
  Clipboard,
  MessageCircle,
  BarChart3,
  HelpCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

const ResponsiveSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const sidebarItems = [
    { icon: Home, label: "Home", id: "home" },
    { icon: BookOpen, label: "Lessons", id: "lessons" },
    { icon: Clock, label: "Timetable", id: "timetable" },
    { icon: Clipboard, label: "Homework", id: "homework" },
    { icon: MessageCircle, label: "Messages", id: "messages" },
    { icon: BarChart3, label: "Assessments", id: "assessments", badge: "AI" },
  ];

  const bottomSidebarItems = [
    { icon: HelpCircle, label: "Support", id: "support" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (label) => {
    setActiveItem(label);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const renderSidebarButton = (item, index) => (
    <button
      key={index}
      onClick={() => handleItemClick(item.label)}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-xl 
        font-medium text-left transition-all duration-200
        transform hover:scale-[1.02] active:scale-[0.98]
        ${
          activeItem === item.label
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
        }
        group relative overflow-hidden
      `}
    >
      {activeItem !== item.label && (
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
          `}
        />
      )}

      <div className="relative z-10 flex items-center space-x-3 w-full">
        <item.icon
          className={`
            w-5 h-5 transition-colors duration-200
            ${
              activeItem === item.label
                ? "text-white"
                : "text-gray-500 group-hover:text-blue-600"
            }
          `}
        />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span
            className={`
              text-xs px-2 py-1 rounded-full font-semibold transition-colors duration-200
              ${
                activeItem === item.label
                  ? "bg-white/20 text-white"
                  : "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
              }
            `}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Active indicator */}
      {activeItem === item.label && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
      )}
    </button>
  );

  return (
    <>
      {/* Hamburger  */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40 lg:z-auto
          w-64 bg-white border-r border-gray-200 
          transform lg:transform-none transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col shadow-xl lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 pt-16 lg:pt-4">
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">
                Client Dashboard
              </span>
              <div className="min-w-max h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mt-0.4  rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item, index) =>
              renderSidebarButton(item, index)
            )}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <div className="space-y-1">
            {bottomSidebarItems.map((item, index) =>
              renderSidebarButton(item, index)
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <span className="text-white font-semibold text-sm">HS</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                Himanshu Suthar
              </div>
              <div className="text-xs text-gray-500 truncate">
                Premium Student
              </div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Other dashboard components  */}
      {/* <div className="flex-1 p-4 sm:p-8 lg:p-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Other Dashboard Components
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              Currently viewing:{" "}
              <span className="font-semibold text-blue-600">{activeItem}</span>
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ResponsiveSidebar;
