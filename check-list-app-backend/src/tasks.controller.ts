import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) { }

  @Get()
  getAllTasks(): Promise<TaskDto[]> {
    return this.taskService.findAll();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string): Promise<TaskDto[]> {
    return this.taskService.findOneById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<TaskDto> {
    return this.taskService.create(task);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto): Promise<TaskDto> {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<number> {
    return this.taskService.delete({ id });
  }
}
