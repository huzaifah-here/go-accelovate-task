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
        <li key={task._id} className="border rounded-lg p-4 shadow-sm">
          <strong className="text-lg font-medium block">{task.name}</strong>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <p>Priority: {task.priority}</p>
            <p>Due Date: {new Date(task.date).toLocaleDateString()}</p>
          </div>
          <div className="mt-3 space-x-2">
            <button
              onClick={() => handleEdit(task._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
