import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiResponse({ type: LoginResponseDto })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({ type: LoginResponseDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  @ApiResponse({ type: CurrentUserDto })
  getProfile(@CurrentUser() user: CurrentUserDto) {
    return user;
  }

  @Delete('delete')
  deleteAccount(@CurrentUser() user: CurrentUserDto) {
    return this.authService.deleteAccount(user.sub);
  }
}
