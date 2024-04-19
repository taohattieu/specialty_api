import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/user/auth/auth.module";

@Module({
    imports: [AuthModule, JwtModule],
    // controllers: [JwtController],
    providers: [
      JwtService,
      {
        provide: 'JWT_SECRET',
        useValue: 'JyZ4WLGwORUYm8zSMAUgLDvqY/TCIX2awFleat0JVu0=', 
      },
    ],
    exports: [JwtService],
  })
  export class JwtModule {}
  