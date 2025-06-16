import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

describe("AuthService", () => {
    let jwtService: JwtService;
    let authService: AuthService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [AuthService],
            imports: [await ConfigModule.forRoot(), JwtModule.register({secret: process.env.JWT_SECRET})]
        }).compile()

        authService = app.get(AuthService);
        jwtService = app.get(JwtService)
    })

    it("JwtService test", async () => {
        await jwtService.signAsync({})
    })
})