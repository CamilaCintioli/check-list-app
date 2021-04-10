import { Task } from 'src/task.entity';

export type DeleteTaskDto = Required<Pick<Task, 'id'>>;
