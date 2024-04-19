import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { ProfileEntity } from 'src/user/profile/entities/profile.entities';
import { ProfileService } from '../profile/profile.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    await this.accountService.createAccount({
      username: signupDto.username,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.accountService.findByUsername(loginDto.username);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { username: user.username};
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}