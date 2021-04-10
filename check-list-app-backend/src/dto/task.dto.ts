import { Task } from "../task.entity";

export type TaskDto = Pick<Task, "id" | "name"> & { isCompleted: boolean };
