import Link from "next/link";
import TaskList from "../components/TaskList";
import { fetchTasks } from "../lib/action";

async function DashboardPage() {
  const tasks = await fetchTasks();
  console.log(tasks);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Link href="dashboard/add">
          <button className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-opacity-50">
            Add New Task
          </button>
        </Link>
      </div>
      <p className="mb-4">Here are your tasks:</p>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default DashboardPage;
