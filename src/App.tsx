import AddTask from "./components/AddTask";
import "./App.css";
import { useTasks } from "./hooks/useTasks";
import Watch from "./components/Watch";
import TaskCard from "./components/TaskCard";
import { useState, type ChangeEvent } from "react";
import type { priorityVals } from "./types/task";

function App() {
  const { tasks, deleteTask, markDone, editTask } = useTasks();
  const [selectedView, setSelectedView] = useState<priorityVals | "">("");

  const visibleTasks = selectedView
    ? tasks.filter((task) => task.priority === selectedView)
    : tasks;

  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedView(e.target.value as priorityVals);
  };
  console.log(tasks);

  return (
    <main className="app-shell">
      <div className="app-glow app-glow-one" />
      <div className="app-glow app-glow-two" />

      <section className="hero-panel glass-panel">
        <div className="hero-copy">
          <p className="hero-kicker">Focus dashboard</p>
          <h1>Todo</h1>
          <p className="hero-text">
            Plan the day in a softer space with clear priorities, frosted
            surfaces, and a quick visual pulse.
          </p>
        </div>

        <div className="watch-panel">
          <Watch />
        </div>
      </section>

      <section className="content-grid">
        <AddTask />

        <section className="glass-panel tasks-panel">
          <div className="section-header">
            <div>
              <p className="section-kicker">Task queue</p>
              <h2>Today&apos;s tasks</h2>
            </div>
            <span className="task-count">
              {tasks.length} {tasks.length > 1 ? "tasks" : "task"}
            </span>
            <div>
              <p>View tasks per priority</p>
              {["High", "Medium", "Low"].map((x) => (
                <label key={x} className="priority-option">
                  <input
                    className="priority-input"
                    onChange={filter}
                    type="radio"
                    name="priority-filter"
                    // id={x}
                    value={x}
                    checked={selectedView === x}
                  />
                  <span>{x}</span>
                </label>
              ))}
            </div>
          </div>
          {visibleTasks.length > 0 ? (
            <div className="task-grid">
              {visibleTasks.map((task) => (
                <TaskCard
                  task={task}
                  key={task.id}
                  deleteTask={() => deleteTask(task.id)}
                  markTaskDone={() => markDone(task.id)}
                  editTask={editTask}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>
                {selectedView
                  ? `No ${selectedView.toLowerCase()} priority tasks yet.`
                  : "No tasks yet."}
              </p>
              <span>
                {selectedView
                  ? "Try another priority or add a new task."
                  : "Add your first task to start filling the board."}
              </span>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
