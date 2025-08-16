export default function HomeWorkProgress() {
  const tasks = {
    todo: [
      "Rational Inequalities - Due 30 Mar, 2024",
      "Homestats Quiz - Due 29 Mar, 2024",
      "Shapes and Structures - Due 03 Apr, 2024",
    ],
    review: [
      "Historical Chronicles - Due 30 Mar, 2024",
      "Epoch Explorations - Due 30 Mar, 2024",
    ],
    completed: [
      "Physics Phantoms - Completed",
      "Language Landscapes - Completed",
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-bold mb-3">Homework Progress</h3>

      <h4 className="font-semibold mb-1">To Do</h4>
      {tasks.todo.map((t, idx) => (
        <p key={idx} className="text-gray-600 text-sm mb-1">
          ⬜ {t}
        </p>
      ))}

      <h4 className="font-semibold mt-3 mb-1">On Review</h4>
      {tasks.review.map((t, idx) => (
        <p key={idx} className="text-gray-600 text-sm mb-1">
          🔵 {t}
        </p>
      ))}

      <h4 className="font-semibold mt-3 mb-1">Completed</h4>
      {tasks.completed.map((t, idx) => (
        <p key={idx} className="text-gray-600 text-sm mb-1">
          ✅ {t}
        </p>
      ))}
    </div>
  );
}
