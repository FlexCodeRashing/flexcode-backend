import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
    let jwtService: JwtService;
    let authService: AuthService;

    beforeEach(async () => {
        const app = await Test.createTestingModule({
            providers: [AuthService],
            imports: [JwtModule.register({secret: "example-secret-key"})]
        }).compile()

        authService = app.get(AuthService);
        jwtService = app.get(JwtService)
    })

    it("Test Jwt", async () => {
        await jwtService.signAsync({})
    })
})