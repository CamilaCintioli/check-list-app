import { Task } from 'src/task.entity';

export type UpdateTaskDto = Pick<Task, 'name' | 'id'>;
