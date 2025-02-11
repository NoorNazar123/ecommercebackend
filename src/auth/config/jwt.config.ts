import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";


const jwtSecret = `${process.env.JWT_SECRET_TOKEN}`;
if (!jwtSecret) {
    throw new Error("JWT_SECRET_TOKEN is missing! Please define it in your environment variables.");
}

export default registerAs("jwt", (): JwtModuleOptions => ({
    secret: jwtSecret,
    signOptions: {
        expiresIn: `${process.env.JWT_EXPIRES_TOKEN}` || "1h",
    },
}));

// export default registerAs("jwt", (): JwtModuleOptions => ({
//     secret: process.env.JWT_SECRET_TOKEN,
//     signOptions: {
//         expiresIn: process.env.JWT_EXPIRES_TOKEN, // Default to 1 hour if missing
//     }
// }));
