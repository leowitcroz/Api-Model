import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorator/user.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly auth: AuthService) { }

    @Post('login')
    async login(@Body() { email, password }) {
        return this.auth.login(email, password)
    }

    @Post('register')
    async register(@Body() { name, email, password , role}: CreateUserDto) {
        return this.auth.register({ name, email, password, role })
    }

    @Post()
    async forget(@Body() { name, email, password }: CreateUserDto) {

    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user) {

        return { user: user }
    }

    @Post()
    async reset(@Body() { name, email, password }: CreateUserDto) {

    }



}
