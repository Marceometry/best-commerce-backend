import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserDto } from '@/auth/dto/current-user.dto';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { user } = request || {};
    return user as CurrentUserDto;
  },
);
