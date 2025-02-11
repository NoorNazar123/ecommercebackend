import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${process.env.JWT_EXPIRES_TOKEN}; ${process.env.JWT_SECRET_TOKEN}`
  }
}
