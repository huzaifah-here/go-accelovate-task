// lib/actions.js
export async function fetchTasks() {
  const res = await fetch("http://localhost:3000/api/task", {
    cache: "no-store", // This makes it behave like getServerSideProps
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}
