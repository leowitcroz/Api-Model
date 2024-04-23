import { Injectable, NotFoundException } from '@nestjs/common';
import { read } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePatchUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ name, email, password }: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        })
    }

    async show() {
        return this.prisma.user.findMany()
    }

    async showOne(id: number) {

        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, data: UpdatePatchUserDto) {

        await this.exist(id)

        if (data.name == "") {
            data.name = (await this.showOne(id)).name
        }
        if (data.password == "") {
            data.password = (await this.showOne(id)).password
        }
        if (data.email == "") {
            data.email = (await this.showOne(id)).email
        }

        return this.prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id){
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exist(id: number) {
        if (!(await this.showOne(id))) {
            throw new NotFoundException('The cat doesnt exist');
        }
    }
}
