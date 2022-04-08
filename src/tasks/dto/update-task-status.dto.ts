import { IsEnum } from 'class-validator';
import { getTaskStatusesErrorString, TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: getTaskStatusesErrorString() })
  status: TaskStatus;
}
