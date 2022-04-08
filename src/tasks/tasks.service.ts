import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let filteredTasks = this.getAllTasks();

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter((task) => {
        const loweredCaseSearch = search.toLowerCase();
        if (
          task.description.toLowerCase().includes(loweredCaseSearch) ||
          task.title.toLowerCase().includes(loweredCaseSearch)
        ) {
          return true;
        }

        return false;
      });
    }

    return filteredTasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return { ...found };
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const newTask = this.getTaskById(id);
    newTask.status = status;

    this.tasks = this.tasks.map((task) =>
      task.id === newTask.id ? newTask : task,
    );

    return newTask;
  }

  // changeTask(id: string, key: string, value: any): Task {
  //   const newTask = this.getTaskById(id);
  //   newTask[key] = value;

  //   this.tasks.map((task) => (task.id === newTask.id ? newTask : task));

  //   return newTask;
  // }
}
