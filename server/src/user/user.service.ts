import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { prismaExclude } from "../helpers/prismaExclude";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    console.log(userWhereUniqueInput);
    return this.prisma.user.findFirst({
      where: {
        ...userWhereUniqueInput,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        posts: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // TODO: send validation email

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  // TODO: add refresh token
  // TODO: add check for email confirmation

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.user({ username });

    const isPasswordMatching = await bcrypt.compare(pass, user?.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: prismaExclude(user, "password"),
    };
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async linkPost(userId: number, postId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        posts: {
          connect: { id: postId },
        },
      },
    });
  }
}
