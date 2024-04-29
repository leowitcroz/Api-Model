import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UserModule), PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  exports: [AuthService]
})
export class AuthModule { }
