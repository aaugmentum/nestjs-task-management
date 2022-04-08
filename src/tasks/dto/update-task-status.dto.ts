import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: `status must be a valid value: ${Object.values(
      TaskStatus,
    ).toString()}`,
  })
  status: TaskStatus;
}
