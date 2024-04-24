import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {


    @Post()
    async login(@Body() { email, password }) {

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
