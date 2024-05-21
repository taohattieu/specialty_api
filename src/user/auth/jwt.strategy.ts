import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, //check hạn token true = auto qua, false = còn hạn mới qua
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    // Called at method use @UseGuards(JwtAuthGuard)
    // Payload là những thông tin được truyền vào trong token
    return {
      username: payload.username,
      profile_id: payload.profile_id,
      account_id: payload.account_id,
      specialty_id: payload.specialty_id
    };
  }
}
