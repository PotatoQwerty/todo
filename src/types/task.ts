export type priorityVals = "High" | "Medium" | "Low";

export interface Task {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  priority: priorityVals;
  finished: boolean;
}
