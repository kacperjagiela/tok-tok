import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, PostModule],
})
export class AppModule {}
