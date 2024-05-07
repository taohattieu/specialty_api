import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class AuthProfileDto {
  profile_id: string;
  account_id: string;
  username: string;
}

export const AuthUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
