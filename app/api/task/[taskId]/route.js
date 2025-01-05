// app/api/task/[taskId]/route.js
import { dbConnect } from "@/app/lib/db";
import Task from "@/app/models/Task";
export async function GET(request, { params }) {
  await dbConnect();

  const { taskId } = params;

  if (!taskId) {
    return new Response(JSON.stringify({ error: "Task ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(task), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching task" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const { taskId } = params;

  if (!taskId) {
    return new Response(JSON.stringify({ error: "Task ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return new Response(
        JSON.stringify({ error: "Task not found or already deleted" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Task successfully deleted" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting task" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
