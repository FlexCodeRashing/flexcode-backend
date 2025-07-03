import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4 } from "uuid";

import { User } from "../prisma/generated";
import { PrismaService } from "../prisma/prisma.service";
import { Permissions } from "./types";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}

    async generateSessionTokens(
        payload: object,
        userId: number,
        scope: Permissions
    ) {
        const f = async () => {
            const stringifyUserId = userId.toString();

            let jti = "";
            let flag = true;
            do {
                jti = uuidv4();
                flag =
                    (await this.prismaService.session.findFirst({
                        where: {
                            jti: jti
                        }
                    })) != null;
            } while (flag);

            const access = await this.jwtService.signAsync(
                {
                    ...payload,
                    type: "access",
                    scope: scope.getValue()
                },
                {
                    subject: stringifyUserId,
                    jwtid: jti,
                    expiresIn: "20m"
                }
            );
            const refresh = await this.jwtService.signAsync(
                {
                    type: "refresh"
                },
                {
                    subject: stringifyUserId,
                    jwtid: jti,
                    expiresIn: "7d"
                }
            );
            return { access: access, refresh: refresh, jti: jti };
        };
        try {
            return await f();
        } catch {
            throw new HttpException(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async createSession(user: User, scope: Permissions, userAgent: string) {
        if (!new Permissions(user.permissions).can(scope))
            throw new HttpException({}, HttpStatus.FORBIDDEN);
        const tokens = await this.generateSessionTokens({}, user.id, scope);

        try {
            await this.prismaService.session.create({
                data: {
                    userId: user.id,
                    scope: scope.getValue(),
                    userAgent: userAgent,
                    jti: tokens.jti,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
                }
            });
        } catch {
            throw new HttpException(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return tokens;
    }
}
