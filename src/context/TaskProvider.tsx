import { createContext, useState, type ReactNode } from "react";
import type { Task } from "../types/task";

export const TasksContext = createContext<{
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  markDone: (id: number) => void;
} | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const addTask = (task: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const deleteTask = (id: number) => {
    setTasks(() => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const markDone = (id: number) => {
    setTasks(() => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, finished: !task.finished };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, markDone }}>
      {children}
    </TasksContext.Provider>
  );
};
