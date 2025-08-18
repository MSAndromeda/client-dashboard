const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      title: "English docents",
      date: "18 Apr, 2024, 15:00",
      image: "/EnglishDocents.jpg",
      type: "english",
    },
    {
      title: "RoboFest",
      date: "26 May, 2024, Today",
      image: "/robofest.jpg",
      type: "robotics",
    },
    {
      title: "AI introduction",
      date: "09 Jun, 2024, 09:00",
      image: "/AIIntro.jpg",
      type: "ai",
    },
    {
      title: "Why engineers are must-haves",
      date: "30 Jun, 2024, 15:00",
      image: "/Engineeers.jpg",
      type: "engineering",
    },
  ];
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming events
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-4 h-100 overflow-y-auto">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="relative w-fit h-[150px]">
            {/* Background Image */}
            <img
              src={event.image}
              alt="background"
              className="w-100 h-full object-cover rounded-2xl"
            />
            {/* Overlay filter */}
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
            {/* Text on top */}
            <div className="absolute inset-0 m-2 group">
              <div className="flex flex-col gap-2">
                <div className="text-xl font-medium text-white">
                  {event.title}
                </div>
                <div className="text-sm text-white">{event.date}</div>
              </div>
              <button className="absolute bottom-1 p-2 right-1 text-base text-white group-hover:bg-white/90 group-hover:text-black rounded-lg hover:cursor-pointer transition duration-300">
                More details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
