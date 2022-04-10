import { IsEnum, IsOptional, IsString } from 'class-validator';
import { getTaskStatusesErrorString, TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: getTaskStatusesErrorString() })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
