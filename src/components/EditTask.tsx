import type { Task } from "../types/task";
import { useState, type ChangeEvent } from "react";

interface EditTaskProps {
  task: Task;
  onCancel: () => void;
  onSave: (updatedTask: Task) => void;
}

function EditTask({ task, onCancel, onSave }: EditTaskProps) {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      priority: value as Task["priority"],
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(updatedTask);
  };

  return (
    <div className="edit-task-panel">
      <div className="edit-task-header">
        <div>
          <p className="section-kicker">Edit task</p>
          <h3>Update your task</h3>
        </div>
      </div>

      <form className="edit-task-form" onSubmit={handleSubmit}>
        <label htmlFor={`edit-task-name-${updatedTask.id}`} className="field">
          <span>Task name</span>
          <input
            onChange={handleInputChange}
            className="field-input"
            type="text"
            id={`edit-task-name-${updatedTask.id}`}
            name="name"
            defaultValue={updatedTask.name}
            placeholder="Task name"
          />
        </label>

        <label
          htmlFor={`edit-task-description-${updatedTask.id}`}
          className="field"
        >
          <span>Task description</span>
          <textarea
            onChange={handleInputChange}
            className="field-input"
            id={`edit-task-description-${updatedTask.id}`}
            name="description"
            rows={3}
            defaultValue={updatedTask.description}
            placeholder="Add a short note"
          />
        </label>

        <div className="field">
          <span>Priority</span>
          <div className="priority-group">
            {["High", "Medium", "Low"].map((priority) => (
              <label key={priority} className="priority-option">
                <input
                  className="priority-input"
                  type="radio"
                  name={`priority-${updatedTask.id}`}
                  value={priority}
                  checked={updatedTask.priority === priority}
                  onChange={handlePriorityChange}
                />
                <span>{priority}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="date-grid">
          <label
            htmlFor={`edit-start-time-${updatedTask.id}`}
            className="field"
          >
            <span>Start date</span>
            <input
              className="field-input"
              type="date"
              id={`edit-start-time-${updatedTask.id}`}
              name="startTime"
              defaultValue={updatedTask.startTime}
            />
          </label>

          <label htmlFor={`edit-end-time-${updatedTask.id}`} className="field">
            <span>Due date</span>
            <input
              className="field-input"
              type="date"
              id={`edit-end-time-${updatedTask.id}`}
              name="endTime"
              defaultValue={updatedTask.endTime}
            />
          </label>
        </div>

        <div className="edit-task-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-button edit-save-button">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
