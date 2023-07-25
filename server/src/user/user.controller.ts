import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";

import { prismaExclude } from "../helpers/prismaExclude";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body()
    userData: {
      email: string;
      name: string;
      password: string;
    }
  ) {
    return this.userService.createUser(userData);
  }

  @Get()
  async findAll(): Promise<Omit<UserModel, "password">[]> {
    const users = await this.userService.users({});
    return users.map((user) => prismaExclude(user, "password"));
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Omit<UserModel, "password">> {
    const user = await this.userService.user({ id: Number(id) });

    return prismaExclude(user, "password");
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserData: { name: string }) {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: updateUserData,
    });
  }

  @Patch(":id/link-post")
  linkPost(@Param("id") id: string, @Body() linkPostData: { id: string }) {
    return this.userService.linkPost(+id, +linkPostData.id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
