import { IsEnum } from 'class-validator';
import { getTaskStatusesErrorString, TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: getTaskStatusesErrorString() })
  status: TaskStatus;
}
