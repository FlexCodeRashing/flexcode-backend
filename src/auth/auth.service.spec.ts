import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";
import { Permission, Permissions } from "./types";

describe("AuthService", () => {
    let jwtService: JwtService;
    let authService: AuthService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [AuthService, PrismaService],
            imports: [
                await ConfigModule.forRoot(),
                JwtModule.register({ secret: process.env.JWT_SECRET })
            ]
        }).compile();

        authService = app.get(AuthService);
        jwtService = app.get(JwtService);
        prismaService = app.get(PrismaService);
    });

    it("JwtService test", async () => {
        await jwtService.signAsync({});
    });

    it("should generate valid JWT", async () => {
        const tokens = await authService.generateSessionTokens(
            {},
            123,
            new Permissions(1)
        );
        console.log(tokens);
        expect(tokens).toBeDefined();
    });

    it("should create session successfully", async () => {
        const session = await authService.createSession(
            {
                id: 1,
                permissions: 1,
                username: ""
            },
            new Permissions().set(Permission.ADMIN, true),
            ""
        )
        console.log(session)
        expect(session).toBeDefined()
    });
});
