import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiResponseProperty()
  isSuccess: boolean;

  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  data?: T;

  constructor(data: T, message: string, isSuccess: boolean) {
    this.data = data;
    this.message = message;
    this.isSuccess = isSuccess;
  }
}
