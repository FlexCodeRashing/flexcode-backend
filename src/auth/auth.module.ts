import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PrismaService } from "../prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({ secret: process.env.JWT_SECRET })
        })
    ]
})
export class AuthModule {}
