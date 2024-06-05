import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { apiVersion } from 'src/constants/version';
import { Public } from 'src/decorators/public.decorator';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { JwtClaimDto } from 'src/common/jwt-claim.dto';
import { TokenService } from 'src/common/token.service';
import { JwtTokenDto } from 'src/common/token.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller({ path: 'auth', version: apiVersion })
@ApiTags('Auth')
// @UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @Post('verify-token')
  @ApiOperation({ summary: 'Kiểm tra hạn Token' })
  verifyToken(@Body() jwtTokenDto: JwtTokenDto): { isValid: boolean } {
    const isValid = this.tokenService.verifyToken(jwtTokenDto.token);
    return { isValid };
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Đăng nhập' })
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this._authService.login(loginRequestDto);
  }

  @Post('refresh-token')
  @Public()
  @ApiOperation({ summary: 'Lấy refresh token' })
  refreshToken(@Body() refreshTokenDto: RefreshTokenRequestDto) {
    return this._authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  @Auth()
  @ApiOperation({ summary: 'Đăng xuất' })
  async logout(@AuthUser() authUser: JwtClaimDto) {
    return await this._authService.logout(authUser);
  }

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Đăng ký' })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this._authService.register(registerRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa account theo id'})
  async remove(@Param('id') account_id: string) {
    return this._authService.remove(account_id);
  }

  @Put(':id/restore')
  @ApiOperation({ summary: 'Khôi phục data đã xóa theo id'})
  async restoreData(@Param('id') account_id: string) {
    try {
      // Gọi phương thức restore từ service để khôi phục dữ liệu đã bị xóa mềm
      const restoredEntity = await this._authService.restoreData(account_id);
      return restoredEntity;
    } catch (error) {
      throw error;
    }
  }
}
