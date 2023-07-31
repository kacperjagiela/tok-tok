import axios, { AxiosInstance } from "axios";

import { StandardResponse } from "../types/StandardResponse";
import { User } from "../types/User";

export class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
    });
  }

  public setToken = () => {
    this.instance.interceptors.request.use((config) => {
      if (!document.cookie || document.cookie === "") return config;

      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token"))
        ?.split("=")[1];

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  };

  public async register({
    username,
    password,
    email,
  }: Pick<User, "username" | "password" | "email">): Promise<User | null> {
    console.log("register");
    try {
      const { data } = await this.instance.post<StandardResponse<User>>(
        "/user/register",
        {
          username,
          password,
          email,
        }
      );

      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async signIn({
    username,
    password,
  }: Pick<User, "username" | "password">): Promise<{
    user: User;
  } | null> {
    try {
      const { data } = await this.instance.post<
        StandardResponse<{ user: User }>
      >("/user/login", {
        username,
        password,
      });

      console.log("login data", data);

      return { user: data.data.user };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getCurrentUser(): Promise<{ user: User } | null> {
    try {
      const { data } = await this.instance.get<
        StandardResponse<{ user: User }>
      >("/user/current-user");

      return { user: data.data.user };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async guardTest(): Promise<{ user: { username: string } } | null> {
    try {
      const { data } = await this.instance.get<
        StandardResponse<{ user: { username: string } }>
      >("/user/guard-test");

      return { user: data.data.user };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
