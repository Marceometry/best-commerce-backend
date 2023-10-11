import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type ICurrentUser = {
  sub: string;
  username: string;
};

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { user } = request || {};
    return user as ICurrentUser;
  },
);
