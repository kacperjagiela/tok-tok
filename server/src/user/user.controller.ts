import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";

import { prismaExclude } from "../helpers/prismaExclude";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { UserGuard } from "./user.guard";
import { UserService } from "./user.service";

type ReturnUser = Omit<UserModel, "password">;

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Auth
  @Post("register")
  async register(
    @Body(new ValidationPipe())
    registerUserDto: RegisterUserDto
  ): Promise<ReturnUser> {
    const registerUser = await this.userService.createUser(registerUserDto);
    return prismaExclude(registerUser, "password");
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto
  ): Promise<{ access_token: string }> {
    return this.userService.signIn(signInDto.username, signInDto.password);
  }

  @Get()
  async findAll(): Promise<ReturnUser[]> {
    const users = await this.userService.users({});
    return users.map((user) => prismaExclude(user, "password"));
  }

  @Get(":username")
  async findOne(@Param("username") username: string): Promise<ReturnUser> {
    const user = await this.userService.user({ username });

    if (!user) throw new NotFoundException("User not found");

    return prismaExclude(user, "password");
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserData: { username: string }
  ) {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: updateUserData,
    });
  }

  @UseGuards(UserGuard)
  @Patch(":id/link-post")
  linkPost(@Param("id") id: string, @Body() linkPostData: { id: string }) {
    return this.userService.linkPost(+id, +linkPostData.id);
  }

  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
