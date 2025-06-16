import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { App } from "supertest/types";

import { AppController } from "../src/app.controller";
import { AppService } from "../src/app.service";
import { AuthModule } from "../src/auth/auth.module";

describe("AppController (e2e)", () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [await ConfigModule.forRoot(), AuthModule],
            controllers: [AppController],
            providers: [AppService]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/ping (GET)", () => {
        return request(app.getHttpServer()).get("/ping").expect(200);
    });
});
