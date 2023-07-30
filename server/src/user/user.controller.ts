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
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { Request, Response } from "express";

import { prismaExclude } from "../helpers/prismaExclude";
import { StandardResponse } from "../types/StandardResponse";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { UserGuard } from "./user.guard";
import { UserService } from "./user.service";

type ReturnUser = Omit<UserModel, "password">;

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Auth
  @Post("register")
  async register(
    @Body(new ValidationPipe())
    registerUserDto: RegisterUserDto
  ): Promise<StandardResponse<ReturnUser>> {
    const registerUser = await this.userService.createUser(registerUserDto);

    return {
      message: "User created successfully!",
      data: prismaExclude(registerUser, "password"),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body(new ValidationPipe()) signInDto: SignInDto
  ): Promise<StandardResponse<{ user: ReturnUser }>> {
    const { user, access_token } = await this.userService.signIn(
      signInDto.username,
      signInDto.password
    );

    response.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      message: "Logged in successfully!",
      data: {
        user: prismaExclude(user, "password"),
      },
    };
  }

  @Get()
  async findAll(): Promise<StandardResponse<ReturnUser[]>> {
    const users = await this.userService.users({});

    return {
      message: "Users fetched successfully!",
      data: users.map((user) => prismaExclude(user, "password")),
    };
  }

  @UseGuards(UserGuard)
  @Get("guard-test")
  async guardTest(): Promise<StandardResponse<{ user: { username: string } }>> {
    return {
      message: "Guard test successful!",
      data: {
        user: { username: "test" },
      },
    };
  }

  @Get("current-user")
  async getCurrentUser(
    @Req() request: Request
  ): Promise<StandardResponse<{ user: ReturnUser }>> {
    const user = await this.userService.getCurrentUser(
      request.cookies.access_token
    );

    return {
      message: "Current user fetched successfully!",
      data: {
        user: prismaExclude(user, "password"),
      },
    };
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserData: { username: string }
  ): Promise<StandardResponse<ReturnUser>> {
    const updateUser = await this.userService.updateUser({
      where: { id: Number(id) },
      data: updateUserData,
    });

    return {
      message: "User updated successfully!",
      data: prismaExclude(updateUser, "password"),
    };
  }

  @UseGuards(UserGuard)
  @Patch(":id/link-post")
  async linkPost(
    @Param("id") id: string,
    @Body() linkPostData: { id: string }
  ): Promise<StandardResponse<ReturnUser>> {
    const linkPost = await this.userService.linkPost(+id, +linkPostData.id);

    return {
      message: "Post linked successfully!",
      data: prismaExclude(linkPost, "password"),
    };
  }

  @UseGuards(UserGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string
  ): Promise<StandardResponse<{ isDeleted: boolean }>> {
    const { isDeleted } = await this.userService.deleteUser({ id: Number(id) });

    return {
      message: "User deleted successfully!",
      data: { isDeleted },
    };
  }

  @Get(":username")
  async findOne(
    @Param("username") username: string
  ): Promise<StandardResponse<ReturnUser>> {
    const user = await this.userService.user({ username });

    if (!user) throw new NotFoundException("User not found");

    return {
      message: "User fetched successfully!",
      data: prismaExclude(user, "password"),
    };
  }
}
