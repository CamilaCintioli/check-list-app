import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import constants from './constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(constants.tasksRepository) private tasksRepository: typeof Task,
  ) { }

  toTaskDto({ id, name, completedAt }: Task): TaskDto {
    return ({ id, name, isCompleted: !!completedAt && new Date() > completedAt });
  }

  create(task: CreateTaskDto): Promise<TaskDto> {
    return this.tasksRepository
      .create(task)
      .then(this.toTaskDto);
  }

  async update(id, { name, isCompleted }: UpdateTaskDto): Promise<TaskDto> {
    const task = await this.tasksRepository.findOne({ where: { id } })

    if (!task) throw new NotFoundException(id)

    if (typeof name === "string") task.name = name;
    if (typeof isCompleted === "boolean") task.completedAt = isCompleted ? new Date() : null;

    return this.toTaskDto(await task.save());
  }

  delete({ id }: DeleteTaskDto): Promise<number> {
    return this.tasksRepository.destroy({ where: { id } });
  }

  findAll(): Promise<TaskDto[]> {
    return this.tasksRepository.findAll().then(tasks => (tasks.map(task => this.toTaskDto(task))));
  }

  findOneById(id: string): Promise<TaskDto> {
    return this.tasksRepository.findOne({ where: { id } }).then(task => this.toTaskDto(task));
  }
}
