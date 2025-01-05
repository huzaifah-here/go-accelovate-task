import { dbConnect } from "@/app/lib/db";
import Task from "@/app/models/Task";
import mongoose from "mongoose";

// Define Task schema with additional fields

// GET all tasks
export async function GET(request) {
  await dbConnect();

  const tasks = await Task.find(); // Fetch all tasks
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST: Add a new task
export async function POST(request) {
  await dbConnect();

  const body = await request.json();
  const { name, description, priority, date } = body;

  if (!name || !description || !priority || !date) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const task = new Task({ name, description, priority, date });
  await task.save();

  return new Response(JSON.stringify(task), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

// PUT: Update a task
export async function PUT(request) {
  await dbConnect();

  const body = await request.json();
  const { id, name, description, priority, date } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: "Task ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { name, description, priority, date },
    { new: true } // Return the updated document
  );

  if (!updatedTask) {
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(updatedTask), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE: Remove a task
export async function DELETE(request) {
  await dbConnect();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Task ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ message: "Task deleted successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
