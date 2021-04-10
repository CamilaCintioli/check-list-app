import constants from './constants';
import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: constants.tasksRepository,
    useValue: Task,
  },
];
