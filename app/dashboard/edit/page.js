// app/dashboard/edit/page.js
export default function EditPage() {
  return (
    <div>
      <h1>Edit Task</h1>
      <form>
        <input type="text" placeholder="Task Name" required />
        <textarea placeholder="Task Description"></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
