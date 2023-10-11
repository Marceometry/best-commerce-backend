import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser, ICurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: ICurrentUser) {
    return user;
  }

  @Delete('delete')
  deleteAccount(@CurrentUser() user: ICurrentUser) {
    return this.authService.deleteAccount(user.sub);
  }
}
