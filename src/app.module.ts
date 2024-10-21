import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RoomsModule } from './rooms/rooms.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AmenitiesModule } from './amenities/amenities.module';

@Module({
  imports: [
    RoomsModule,
    PrismaModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AmenitiesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
