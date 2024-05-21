import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  verifyToken(token: string): boolean {
    try {
      const decodedToken = jwt.decode(token);
      if (!decodedToken || typeof decodedToken !== 'object' || !('exp' in decodedToken)) {
        return false;
      }
      const expirationTime = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (đơn vị giây)
      return currentTime < expirationTime;
    } catch (error) {
      console.error('Error decoding or verifying token:', error.message);
      return false;
    }
  }
}
