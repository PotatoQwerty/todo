import { useState, type ChangeEvent } from "react";
import type { Task } from "../types/task";
import { useTasks } from "../hooks/useTasks";

function AddTask() {
  const [task, setTask] = useState<Task>({
    id: NaN,
    name: "",
    description: "",
    endTime: "",
    startTime: "",
    priority: "High",
    finished: false,
  });

  const addTask = useTasks().addTask;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    const currentDate = today.getTime();

    if (!task.name.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    if (!task.description.trim()) {
      alert("Task description cannot be empty!");
      return;
    }

    if (!task.startTime) {
      alert("Task Start time cannot be empty!");
      return;
    } else if (Date.parse(task.startTime) <= currentDate) {
      alert("Start date cannot be before today");
      return;
    }

    if (!task.endTime) {
      alert("Task end time cannot be empty!");
      return;
    } else if (Date.parse(task.endTime) < Date.parse(task.startTime)) {
      alert("End date cannot be before Start date");
      return;
    } else if (Date.parse(task.endTime) < currentDate) {
      alert("End date cannot be before Start date");
      return;
    }

    addTask({
      ...task,
      id: Date.now(),
    });

    setTask({
      id: NaN,
      name: "",
      description: "",
      endTime: "",
      startTime: "",
      priority: "High",
      finished: false,
    });
  };

  return (
    <section className="glass-panel form-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">Create task</p>
          <h2>Add something important</h2>
        </div>
      </div>

      <label htmlFor="task-name" className="field">
        <span>Task name</span>
        <input
          className="field-input"
          type="text"
          name="name"
          value={task.name}
          id="task-name"
          placeholder="Design landing page"
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="task-description" className="field">
        <span>Task description</span>
        <textarea
          className="field-input"
          name="description"
          value={task.description}
          id="task-description"
          placeholder="Design a landing page for the new product launch"
          onChange={handleInputChange}
        />
      </label>

      <div className="field">
        <span>Priority</span>
        <div className="priority-group">
          {["High", "Medium", "Low"].map((x) => (
            <label key={x} className="priority-option">
              <input
                className="priority-input"
                onChange={handleInputChange}
                type="radio"
                name="priority"
                id={x}
                value={x}
                checked={task.priority === x}
              />
              <span>{x}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="date-grid">
        <label htmlFor="start-time" className="field">
          <span>Start date</span>
          <input
            className="field-input"
            onChange={handleInputChange}
            type="date"
            name="startTime"
            value={task.startTime}
            id="start-time"
            title="start time"
          />
        </label>

        <label htmlFor="end-time" className="field">
          <span>Due date</span>
          <input
            className="field-input"
            onChange={handleInputChange}
            type="date"
            name="endTime"
            value={task.endTime}
            id="end-time"
            title="end time"
          />
        </label>
      </div>

      <button
        onClick={handleAddTask}
        title="add task"
        className="primary-button"
      >
        Add task
      </button>
    </section>
  );
}

export default AddTask;
