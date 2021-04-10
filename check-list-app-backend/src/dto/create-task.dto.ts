import { Task } from 'src/task.entity';

export type CreateTaskDto = Pick<Task, 'name'>;
