import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async test() {
        return await this.jwtService.signAsync({a: "b"})
    }
}
