import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<number> {
    return this.taskService.delete({ id });
  }
}
