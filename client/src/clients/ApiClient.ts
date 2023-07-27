import axios, { AxiosInstance } from "axios";

import { User } from "../types/User";

export class ApiClient {
  private instance: AxiosInstance;

  constructor(accessToken: string, clientId: string) {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL as string,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": `${clientId}`,
      },
    });
  }

  public async register({
    username,
    password,
    email,
  }: Pick<User, "username" | "password" | "email">): Promise<User | null> {
    try {
      const { data } = await this.instance.post("/user/register", {
        username,
        password,
        email,
      });

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async signIn({
    username,
    password,
  }: Pick<User, "username" | "password">): Promise<{
    access_token: string;
    user: User;
  } | null> {
    try {
      const { data } = await this.instance.post("/user/login", {
        username,
        password,
      });

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
