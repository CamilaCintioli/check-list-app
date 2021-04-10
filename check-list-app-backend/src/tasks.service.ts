import { Injectable, Inject } from '@nestjs/common';
import constants from './constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(constants.tasksRepository) private tasksRepository: typeof Task,
  ) {}

  async create(task: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create(task);
  }

  async update({ id, ...rest }: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } }).then((task) => {
      Object.assign(task, rest);
      task.save();
      return task;
    });
  }

  async delete({ id }: DeleteTaskDto): Promise<number> {
    return this.tasksRepository.destroy({ where: { id } });
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll<Task>();
  }
}
