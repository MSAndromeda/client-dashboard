"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";

// Color options for tasks
const TASK_COLORS = [
  {
    name: "Blue",
    value: "bg-blue-500",
    light: "bg-blue-100",
    text: "text-blue-700",
  },
  {
    name: "Green",
    value: "bg-green-500",
    light: "bg-green-100",
    text: "text-green-700",
  },
  {
    name: "Orange",
    value: "bg-orange-500",
    light: "bg-orange-100",
    text: "text-orange-700",
  },
  {
    name: "Purple",
    value: "bg-purple-500",
    light: "bg-purple-100",
    text: "text-purple-700",
  },
  {
    name: "Red",
    value: "bg-red-500",
    light: "bg-red-100",
    text: "text-red-700",
  },
  {
    name: "Indigo",
    value: "bg-indigo-500",
    light: "bg-indigo-100",
    text: "text-indigo-700",
  },
];

export default function TimetablePage() {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskListModal, setShowTaskListModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    time: "",
    description: "",
    color: 0,
  });

  // Sample data to match the reference image
  useEffect(() => {
    const sampleTasks = {
      "2024-03-29": [
        {
          id: "1",
          title: "Algorithms",
          subject: "Mathematics",
          time: "09:00",
          color: "bg-blue-500",
        },
        {
          id: "2",
          title: "Levels of organization...",
          subject: "Biology",
          time: "10:00",
          color: "bg-green-500",
        },
        {
          id: "3",
          title: "English Literature",
          subject: "English",
          time: "11:30",
          color: "bg-orange-500",
        },
      ],
    };
    setTasks(sampleTasks);
  }, []);

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // Get calendar data
  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const adjustedStartDay =
      startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1; // Adjust for Monday start

    const monthData = [];

    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = adjustedStartDay - 1; i >= 0; i--) {
      monthData.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonth.getDate() - i),
      });
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      monthData.push({
        date,
        isCurrentMonth: true,
        fullDate: new Date(year, month, date),
      });
    }

    // Next month's leading days to complete the grid
    const remainingDays = 42 - monthData.length;
    for (let date = 1; date <= remainingDays; date++) {
      monthData.push({
        date,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, date),
      });
    }

    return monthData;
  };

  // Format date for storage key
  const formatDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Handle date click - show tasks for that date
  const handleDateClick = (date, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    setSelectedDate(date);
    setShowTaskListModal(true);
  };

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    const dateKey = formatDateKey(date);
    return tasks[dateKey] || [];
  };

  // Open add task modal
  const openAddTaskModal = () => {
    setEditingTask(null);
    setNewTask({
      title: "",
      subject: "",
      time: "",
      description: "",
      color: 0,
    });
    setShowTaskModal(true);
    setShowTaskListModal(false);
  };

  // Open edit task modal
  const openEditTaskModal = (task) => {
    setEditingTask(task);
    const colorIndex = TASK_COLORS.findIndex(
      (color) => color.value === task.color
    );
    setNewTask({
      title: task.title,
      subject: task.subject,
      time: task.time,
      description: task.description || "",
      color: colorIndex >= 0 ? colorIndex : 0,
    });
    setShowTaskModal(true);
    setShowTaskListModal(false);
  };

  // Delete task
  const deleteTask = (taskId) => {
    if (!selectedDate) return;
    const dateKey = formatDateKey(selectedDate);
    setTasks((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((task) => task.id !== taskId),
    }));
  };

  // Save task (add or edit)
  const saveTask = () => {
    if (!selectedDate || !newTask.title || !newTask.time) return;

    const dateKey = formatDateKey(selectedDate);

    if (editingTask) {
      // Edit existing task
      const updatedTask = {
        ...editingTask,
        title: newTask.title,
        subject: newTask.subject,
        time: newTask.time,
        description: newTask.description,
        color: TASK_COLORS[newTask.color].value,
      };

      setTasks((prev) => ({
        ...prev,
        [dateKey]: (prev[dateKey] || []).map((task) =>
          task.id === editingTask.id ? updatedTask : task
        ),
      }));
    } else {
      // Add new task
      const task = {
        id: Date.now().toString(),
        title: newTask.title,
        subject: newTask.subject,
        time: newTask.time,
        description: newTask.description,
        color: TASK_COLORS[newTask.color].value,
      };

      setTasks((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), task],
      }));
    }

    // Reset form
    setNewTask({
      title: "",
      subject: "",
      time: "",
      description: "",
      color: 0,
    });
    setEditingTask(null);
    setShowTaskModal(false);
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Get color class for task
  const getTaskColorClass = (color) => {
    const colorObj = TASK_COLORS.find((c) => c.value === color);
    return colorObj || TASK_COLORS[0];
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-6   bg-slate-100 min-h-screen flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 ">
        <div className="flex items-center space-x-3">
          <Calendar className="h-6 w-6 text-neutral-700" />
          <h1 className="text-2xl font-semibold text-gray-900">Timetable</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 min-w-[150px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 w-full flex-1">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-medium text-gray-600 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <div className="grid grid-cols-7">
          {getMonthData().map((day, index) => {
            const dayTasks = getTasksForDate(day.fullDate);
            const isCurrentDay = isToday(day.fullDate);

            return (
              <div
                key={index}
                onClick={() =>
                  handleDateClick(day.fullDate, day.isCurrentMonth)
                }
                className={`
                  min-h-[120px] p-3 border-r border-b border-gray-200 cursor-pointer transition-all
                  ${
                    day.isCurrentMonth
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 text-gray-400"
                  }
                  ${isCurrentDay ? "bg-blue-50 border-blue-200" : ""}
                  ${index % 7 === 6 ? "border-r-0" : ""}
                  hover:shadow-sm
                `}
              >
                <div
                  className={`
                  text-sm font-medium mb-2
                  ${
                    isCurrentDay
                      ? "text-blue-600"
                      : day.isCurrentMonth
                      ? "text-gray-900"
                      : "text-gray-400"
                  }
                `}
                >
                  {day.date}
                </div>

                {/* Tasks for this date */}
                <div className="space-y-1">
                  {dayTasks.map((task) => {
                    const colorClass = getTaskColorClass(task.color);
                    return (
                      <div
                        key={task.id}
                        className={`text-xs p-2 rounded ${colorClass.light} ${colorClass.text}`}
                      >
                        <div className="font-medium">{task.time}</div>
                        <div className="truncate">{task.title}</div>
                        {task.subject && (
                          <div className="text-xs opacity-75 truncate">
                            {task.subject}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task List Modal */}
      {showTaskListModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => {
              setShowTaskListModal(false);
              setSelectedDate(null);
            }}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-neutral-400 max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Tasks for {selectedDate.toLocaleDateString()}
              </h3>
              <button
                onClick={() => {
                  setShowTaskListModal(false);
                  setSelectedDate(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {getTasksForDate(selectedDate).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No tasks for this date
                </p>
              ) : (
                <div className="space-y-3">
                  {getTasksForDate(selectedDate).map((task) => {
                    const colorClass = getTaskColorClass(task.color);
                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg ${colorClass.light} border`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className={`font-semibold ${colorClass.text}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-600">{task.time}</p>
                            {task.subject && (
                              <p className="text-sm text-gray-500">
                                {task.subject}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-1 ml-2">
                            <button
                              onClick={() => openEditTaskModal(task)}
                              className="p-2 hover:bg-slate-300 hover:bg-opacity-50 rounded-lg transition-colors"
                            >
                              <Edit className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-2 hover:bg-slate-300 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={openAddTaskModal}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0      bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl shadow-neutral-400 max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTask ? "Edit Task" : "Add Task"} for{" "}
                {selectedDate?.toLocaleDateString()}
              </h3>
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                  setNewTask({
                    title: "",
                    subject: "",
                    time: "",
                    description: "",
                    color: 0,
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter task title"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTask.subject}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter subject"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {TASK_COLORS.map((color, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setNewTask((prev) => ({ ...prev, color: index }))
                      }
                      className={`
                        w-8 h-8 rounded-full ${color.value} transition-all
                        ${
                          newTask.color === index
                            ? "ring-2 ring-gray-400 scale-110"
                            : "hover:scale-105"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                  setNewTask({
                    title: "",
                    subject: "",
                    time: "",
                    description: "",
                    color: 0,
                  });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveTask}
                disabled={!newTask.title || !newTask.time}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
