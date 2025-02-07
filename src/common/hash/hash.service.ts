import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        return await hash(password);
    }

    async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await verify(hashedPassword, plainPassword);
    }
}
