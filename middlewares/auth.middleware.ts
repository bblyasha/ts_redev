import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      console.log('----TOKEN----', token)
      console.log('-------AUTHHEADER-----', authHeader)
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
      const user = this.jwtService.verify(token, { secret });

      req['user'] = user;
      next();
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
