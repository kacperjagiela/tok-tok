import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PrismaService } from "../prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
