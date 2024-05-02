import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/guard/role.guard';
import { UpdatePatchUserDto } from './dto/update-user.dto';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {

    constructor(private readonly user: UserService) { }

    @Post()
    async createUser(@Body() { name, email, password, role }: CreateUserDto) {

        return this.user.create({ name, email, password, role })
    }

    @Get()
    async showUsers() {
        return this.user.show()
    }

    @Get(':id')
    async showOneUser(@Param('id', ParseIntPipe) id) {
        return this.user.showOne(id)
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id, @Body() data: UpdatePatchUserDto){

        return this.user.update(id,data)
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return this.user.delete(id)
    }

}
