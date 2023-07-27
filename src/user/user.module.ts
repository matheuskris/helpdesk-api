import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class UserModule {}
