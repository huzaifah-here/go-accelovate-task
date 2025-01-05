"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }) {
  const { taskId } = params; // Extract taskId from URL params
  const router = useRouter();

  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "low", // Default priority
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch task data when the component mounts
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/task/${taskId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await res.json();
        setTask(data);
      } catch (err) {
        setError("Error fetching task details");
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate fields
    if (!task.name || !task.description || !task.priority || !task.date) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskId, // Include task ID for the update
          name: task.name,
          description: task.description,
          priority: task.priority,
          date: task.date,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      // Redirect to Dashboard
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold text-white mb-4">Edit Task</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            placeholder="Enter task name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-white"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-white"
          >
            Due Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-opacity-80 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span> // Spinner
            ) : (
              "Update Task"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
