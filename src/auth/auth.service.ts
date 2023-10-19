import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      name: data.name,
      username: data.username,
      password: hashedPassword,
    });
    return this.signIn(user.username, data.password);
  }

  async signIn(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username, name: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async deleteAccount(id: string) {
    return this.usersService.delete(id);
  }
}
