import { Controller, Post, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("/auth")
export class AuthController {
    @Post("/discord")
    async postDiscord(
        @Req() req: Request,
        @Res() res: Response,
        @Query("code") code: number
    ) {
        console.log(code);
        return res.send(`${code}`);
    }
}
