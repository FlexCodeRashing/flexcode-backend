import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("/auth")
export class AuthController {
    @Post("/discord")
    async postDiscord(@Req() req: Request, @Res() res: Response) {

    }
}
