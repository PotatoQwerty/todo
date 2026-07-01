import { createContext, useState, type ReactNode } from "react";
import type { Task } from "../types/task";

export const TasksContext = createContext<{
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  markDone: (id: number) => void;
  editTask: (id: number, updatedTask: Task) => void;
} | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (!storedTasks) {
      return [];
    }

    try {
      return JSON.parse(storedTasks) as Task[];
    } catch {
      return [];
    }
  });

  const persistTasks = (nextTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(nextTasks));
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      persistTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      persistTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const markDone = (id: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, finished: !task.finished };
        }
        return task;
      });
      persistTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const editTask = (id: number, updatedTask: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...updatedTask, id };
        }
        return task;
      });
      persistTasks(updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, markDone, editTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
