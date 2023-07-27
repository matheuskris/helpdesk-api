import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from '../dtos/auth.dto';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}
    
    @Post('/signup')
    signUp(@Body() body: SignupDTO) {
        return this.authService.signUp(body);
    }

    @Post('/signin')
    signin(@Body() body: SigninDTO) {
        return this.authService.signin(body);
    }

    @Get('/me')
    me(@User() user: { id: number, name: string }) {
        return this.authService.me(user.id);
    }

}
