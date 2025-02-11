import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";

// export default registerAs("refresh-jwt", (): JwtSignOptions => {
//     const secret = `${process.env.JWT_REFRESH_TOKEN}`;
//     const expiresIn = `${process.env.JWT_REFRESH_EXPIRES_TOKEN}`;

//     if (!secret) {
//         throw new Error("JWT_REFRESH_TOKEN environment variable is not set");
//     }

//     if (!expiresIn) {
//         throw new Error("JWT_REFRESH_EXPIRES_TOKEN environment variable is not set");
//     }

//     return {
//         secret,
//         expiresIn,
//     };
// });
export default registerAs("refreshConfig", (): JwtSignOptions => {
    const secret = process.env.JWT_REFRESH_TOKEN;
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_TOKEN;

    if (!secret) {
        throw new Error("JWT_REFRESH_TOKEN environment variable is not set");
    }

    if (!expiresIn) {
        throw new Error("JWT_REFRESH_EXPIRES_TOKEN environment variable is not set");
    }

    return {
        secret,
        expiresIn,
    };
});
