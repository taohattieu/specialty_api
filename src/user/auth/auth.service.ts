import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository, getManager, getConnection } from 'typeorm';
import { ProfileDto } from '../profile/dto/profile.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from '../profile/entities/profile.entities';
import { AccountEntity } from '../account/entities/account.entities';
import { ProfileRepository } from '../profile/profile.repository';
import { AccountDto } from '../account/dto/account.dto';
import { JwtClaimDto } from 'src/common/jwt-claim.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,

    @InjectRepository(ProfileEntity)
    private readonly _profileRepository: ProfileRepository,

    @InjectRepository(AccountEntity)
    private readonly _accountRepository: Repository<AccountEntity>,

    private readonly _configService: ConfigService,
  ) {}

  //Đăng nhập
  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const existedAccount = await this._accountRepository.findOne({
        where: { username: loginRequestDto.username },
        relations: ['profile'],
      });
  
      if (!existedAccount) {
        throw new NotFoundException('Account not found');
      }
  
      if (!existedAccount.profile) {
        throw new NotFoundException('Profile not found');
      }
  
      const isMatch = await bcrypt.compare(
        loginRequestDto.password,
        existedAccount.password,
      );
      if (!isMatch) {
        throw new BadRequestException('Wrong password');
      }
  
      const refreshToken = await this._generateRefreshToken(
        loginRequestDto.username,
      );
      await this._accountRepository.update(existedAccount.account_id, {
        refreshToken,
      });
      const accessToken: string = await this._accessToken(
        loginRequestDto.username,
        existedAccount.profile.profile_id,
        existedAccount.account_id,
      );
  
      // Gán giá trị cho account_id
      const account_id = existedAccount.account_id;
  
      const account = await this._accountRepository.findOne({
        where: { username: loginRequestDto.username },
        relations: ['profile'],
      });
  
      // Trả về đối tượng LoginResponseDto với thông tin cần thiết
      return {
        accessToken,
        refreshToken,
        account_id,
        account: new AccountDto(account),
        profile: new ProfileDto(account.profile),
      };
    } catch (error) {
      throw error;
    }
  }
  

  //Đăng ký
  public async register(registerRequestDto: RegisterRequestDto) {
    try {
      //Tìm xem username đã có trong CSDL chưa
      const existedAccount = await this._accountRepository.findOne({
        where: { username: registerRequestDto.username },
      });
      //Nếu username đã tồn tại trong CSDL rồi thì báo Username already exists
      if (existedAccount) {
        throw new BadRequestException(
          'Username already exists: ' + registerRequestDto.username,
        );
      }
  
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(registerRequestDto.password, salt);
  
      const accountCreatedWithoutRefreshToken =
        await this._accountRepository.save({
          username: registerRequestDto.username,
          isVerified: !!registerRequestDto.username,
          refreshToken: '',
          password: hashPassword,
        });
  
      // Create profile
      await this._profileRepository.save({
        displayName: `${registerRequestDto.firstName} ${registerRequestDto.lastName}`,
        avatar: `${registerRequestDto.avatar}`,
        coverImage: `${registerRequestDto.coverImage}`,
        address: `${registerRequestDto.address}`,
        email: `${registerRequestDto.email}`,
        phone: `${registerRequestDto.phone}`,
        account: { account_id: accountCreatedWithoutRefreshToken.account_id },
      });
  
      const refreshToken = await this._generateRefreshToken(
        registerRequestDto.username,
      );
  
      await this._accountRepository.update(
        accountCreatedWithoutRefreshToken.account_id,
        {
          refreshToken: refreshToken,
        },
      );
  
      const accountCreated = await this._accountRepository.findOne({
        where: { account_id: accountCreatedWithoutRefreshToken.account_id },
        relations: ['profile'],
      });
  
      return { account: new AccountDto(accountCreated), refreshToken };
    } catch (error) {
      throw error;
    }
  }
  

  // Xóa account và profile
  async remove(account_id: string) {
    try {
        // Kiểm tra xem tài khoản và thông tin người dùng tồn tại trước khi xóa
        const profile = await this._profileRepository.findOne({
          where: { account: { account_id } },
          relations: ['account']
      });      
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }

        // Xóa thông tin người dùng
        const deleteProfileResult = await this._profileRepository.softDelete({ account: { account_id } });
        if (!deleteProfileResult || deleteProfileResult.affected === 0) {
            throw new BadRequestException('Failed to delete profile');
        }

        // Xóa tài khoản
        const deleteAccountResult = await this._accountRepository.softDelete(account_id);
        if (!deleteAccountResult || deleteAccountResult.affected === 0) {
            throw new BadRequestException('Failed to delete account');
        }

        return `'Delete successfully' ${account_id}`;
    } catch (error) {
        throw error;
    }
}


// Khôi phục account và profile
async restoreData(id: string) {
    // Lấy id của account đã bị xóa để khôi phục
      const restoredAccount = await this._accountRepository.findOne({
      where: {
        account_id: id, 
        deletedAt: Not(IsNull()),
      },
      withDeleted: true
    });
    // console.log("restoredAccount.account_id:", restoredAccount.account_id);

    if (restoredAccount === null || restoredAccount === undefined) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    // Lấy profile tương ứng với account đã khôi phục
    const profile = await this._profileRepository.findOne({
      where: { account: { account_id: restoredAccount.account_id }, deletedAt: Not(IsNull()), },
      withDeleted: true
    });

    // console.log("profile: ", profile)
    // Kiểm tra xem profile có tồn tại không
    if (profile === null || profile === undefined) {
      throw new NotFoundException('Profile not found');
    }
    
    // Đặt deleteAt về giá trị null sau khi khôi phục account và profile
      restoredAccount.deletedAt = null;
      profile.deletedAt = null;

        // Lưu các thay đổi vào cơ sở dữ liệu
        await this._accountRepository.save(restoredAccount);
        await this._profileRepository.save(profile);

    return { restoredAccount, profile };
}


async logout(authUser: JwtClaimDto): Promise<string> {
  try {
    // Tìm và cập nhật thông tin tài khoản để đánh dấu là đã đăng xuất
    const updatedAccount = await this._accountRepository.findOne({
      where: { account_id: authUser.account_id }
    });
    if (!updatedAccount) {
      throw new NotFoundException(`Account ${authUser.account_id} not found`);
    }
    updatedAccount.refreshToken = null; // Đánh dấu refreshToken của tài khoản thành null để đăng xuất
    await this._accountRepository.save(updatedAccount); // Lưu thay đổi vào cơ sở dữ liệu

    return `Logout successfully ${authUser.account_id}`;
  } catch (error) {
    throw error;
  }
}


  // Lấy refreshToken
  async refreshToken(refreshTokenRequestDto: RefreshTokenRequestDto) {
    try {
      const isValid = await this._jwtService.verifyAsync(
        refreshTokenRequestDto.refreshToken,
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        },
      );
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const existedAccount = await this._accountRepository.findOne({
        where: { refreshToken: refreshTokenRequestDto.refreshToken },
        relations: ['profile'],
      });
      if (!existedAccount) {
        throw new BadRequestException(
          'User not found: ' + refreshTokenRequestDto.refreshToken,
        );
      }
      const accessToken = await this._accessToken(
        existedAccount.username,
        existedAccount.profile.profile_id,
        existedAccount.account_id,
      );
      return { accessToken: accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async _accessToken(
    username: string,
    profile_id: string,
    account_id: string,
  ) {
    try {
      const accessToken: string = await this._jwtService.signAsync({
        account_id,
        profile_id,
        username: username,
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  private async _generateRefreshToken(username: string) {
    try {
      const refreshToken = await this._jwtService.signAsync(
        {
          username,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this._configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      );

      return refreshToken;
    } catch (error) {
      throw error;
    }
  }
}
