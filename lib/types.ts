export type Effort = "Low" | "Medium" | "High";
export type Priority = "High" | "Medium" | "Low";

export type PointRow = {
  id: string;
  area: string;
  component: string;
  currentState: string;
  risks: string[];
  target: string[];
  benefits: string[];
  priority: Priority;
  effort: Effort;
};