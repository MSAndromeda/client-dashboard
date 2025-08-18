import { Calendar } from "lucide-react";

const Timetable = () => {
  // Sample calendar data
  const calendar = [
    { day: "Mon", date: 25 },
    { day: "Tue", date: 26 },
    { day: "Wed", date: 27 },
    { day: "Thu", date: 28, active: true },
    { day: "Fri", date: 29 },
    { day: "Sat", date: 30 },
    { day: "Sun", date: 31 },
  ];

  // Sample timetable data
  const timetableData = [
    {
      time: "09:00",
      subject: "Algorithms",
      teacher: "Mathematics",
      color: "bg-blue-500",
    },
    {
      time: "10:00",
      subject: "Levels of organization of living things",
      teacher: "Biology",
      color: "bg-green-500",
    },
    {
      time: "11:30",
      subject: "English Literature",
      teacher: "English",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Timetable</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      {/* Date */}
      <div className="text-sm text-gray-500 mb-4">Mar 28, 2024</div>

      {/* Calendar row */}
      <div className="flex justify-between mb-4">
        {calendar.map((day, index) => (
          <div
            key={index}
            className={`text-center cursor-pointer ${
              day.active ? "text-blue-600 font-semibold" : "text-gray-600"
            }`}
          >
            <div className="text-xs mb-1">{day.day}</div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                day.active ? "bg-blue-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>

      {/* Timetable list */}
      <div className="space-y-3">
        {timetableData.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="text-sm text-gray-500 w-12">{item.time}</div>
            <div className={`w-1 h-8 rounded-full ${item.color}`}></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {item.subject}
              </div>
              {item.teacher && (
                <div className="text-xs text-gray-500">{item.teacher}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
