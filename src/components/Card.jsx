import { CheckCircle, BookOpen, Star } from "lucide-react";

export default function Card({ key, title, value, description }) {
  const icons = {
    Attendance: { icon: CheckCircle, color: "text-green-500" },
    Homework: { icon: BookOpen, color: "text-blue-500" },
    Rating: { icon: Star, color: "text-yellow-500" },
  };

  const IconConfig = icons[title] || {};
  const Icon = IconConfig.icon;

  return (
    <div
      key={key}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.08)] w-54 2xl:w-74 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 font-['Poppins']"
    >
      {/* Title */}
      <h3 className="text-gray-800 text-sm font-semibold tracking-wide mb-3">
        {title}
      </h3>

      {/* Value + Icon */}
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className={`w-6 h-6 ${IconConfig.color}`} />}
        <span className="text-3xl font-extrabold text-gray-900 drop-shadow-sm">
          {value}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-snug font-medium">
        {description}
      </p>
    </div>
  );
}
