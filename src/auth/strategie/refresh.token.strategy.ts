import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import type { AuthJwtPayload } from "../type/auth-jwtPayload";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";

@Injectable()
export class RereshStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor(
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            secretOrKey: refreshTokenConfig.secret || (() => { throw new Error("JWT secret key is missing"); })(),
            ignoreExpiration: false,
        });
    }

    //request.user
    async validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        const user = await this.authService.validateRefreshToken(userId);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        return user;
    }
}




