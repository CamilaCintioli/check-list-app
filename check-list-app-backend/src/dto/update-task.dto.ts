import { Task } from 'src/task.entity';

export type UpdateTaskDto = Pick<Task, 'id' | 'name'> & { isCompleted: boolean };
