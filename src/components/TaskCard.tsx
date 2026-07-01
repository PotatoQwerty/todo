import { useState } from "react";
import type { Task } from "../types/task";
import EditTask from "./EditTask";

interface TaskCardInterface {
  task: Task;
  deleteTask: () => void;
  markTaskDone: () => void;
  editTask: (id: number, updatedTask: Task) => void;
}
function TaskCard({
  task,
  deleteTask,
  markTaskDone,
  editTask,
}: TaskCardInterface) {
  const [isEditing, setIsEditing] = useState(false);

  const priorityClass =
    task.priority === "High"
      ? "task-card-high"
      : task.priority === "Medium"
        ? "task-card-medium"
        : "task-card-low";

  const handleDeleteTask = () => {
    if (confirm("Are you sure you want to delete this taks?")) {
      deleteTask();
    } else return;
  };

  return (
    <div className={`task-card ${priorityClass}`}>
      <div className="task-card-header">
        <h3 className={`${task.finished ? "line-through" : ""}`}>
          {task.name}
        </h3>
        <span className="task-priority-pill">{task.priority}</span>
      </div>

      <div>
        <p>{task.description || "No description provided."}</p>
      </div>

      <div className="task-meta">
        <p>
          <span>Starts</span>
          {task.startTime || "Not set"}
        </p>
        <p>
          <span>Due</span>
          {task.endTime || "Not set"}
        </p>
      </div>
      <div className="buttons-container">
        <button title="Mark task as done" onClick={markTaskDone}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="fill-green-500 hover:fill-green-300 transition-all ease-in-out duration-200"
          >
            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5zm-9 12l-4-4l1.41-1.42L10 14.17l6.59-6.59L18 9"></path>
          </svg>
        </button>
        <button title="delete task" onClick={handleDeleteTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="fill-red-500 hover:fill-red-300"
          >
            <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"></path>
          </svg>
        </button>
        <button
          className="edit-toggle-button"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <EditTask
          task={task}
          onCancel={() => setIsEditing(false)}
          onSave={(updatedTask) => {
            editTask(task.id, updatedTask);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default TaskCard;
