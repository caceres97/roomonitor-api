import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './app.dto';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @Get()
  HealthCheck(): { message: string } {
    return { message: 'Working!' };
  }

  @Post('login')
  login(@Body() body: LoginDto): { message: string; apikey: string } {
    const { username, password } = body;
    if (username === 'angel' && password === '1324') {
      return {
        message: 'Login success!',
        apikey: process.env.API_KEY,
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
