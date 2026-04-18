import { useContext } from "react";
import { TasksContext } from "../context/TaskProvider";

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context)
    throw new Error("There was an error creating the tasks context!");
  return context;
};
