import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly auth: AuthService) { }

    @Post('login')
    async login(@Body() { email, password }) {
        return this.auth.login(email, password)
    }

    @Post()
    async register(@Body() { name, email, password }: CreateUserDto) {

    }

    @Post()
    async forget(@Body() { name, email, password }: CreateUserDto) {

    }

    @Post()
    async reset(@Body() { name, email, password }: CreateUserDto) {

    }



}
