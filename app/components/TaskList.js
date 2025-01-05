"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskList({ tasks }) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const router = useRouter();

  const handleEdit = (taskId) => {
    console.log("Edit task:", taskId);
    router.push(`/dashboard/edit/${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLocalTasks(localTasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul className="space-y-4">
      {localTasks.map((task) => (
        <li
          key={task._id}
          className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <strong className="text-xl font-semibold block">
                {task.name}
              </strong>
              <p className="text-sm text-gray-200 mt-2">{task.description}</p>
            </div>
            <div className="text-sm text-gray-300">
              <p>Priority: {task.priority}</p>
              <p>Due Date: {new Date(task.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handleEdit(task._id)}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-transparent border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
