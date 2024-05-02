import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define the userId property
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const decodedToken = this.jwtService.verify(token, { ignoreExpiration: false });
      // If token is valid, you can attach the user data to the request for later use
      req.userId = decodedToken; 
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
