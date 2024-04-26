import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'user'

    constructor(private readonly prisma: PrismaService, private readonly user: UserService, private readonly jwt: JwtService) { }

    async createToken(user: user) {
        return {
            acesstoken: this.jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                issuer: this.issuer,
                audience: this.audience,
                expiresIn: '7 days',
                subject: String(user.id)
            })
        }
    }

    async checkToken(token: string) {
        try {
            const data = this.jwt.verify(token, {
                issuer: this.issuer,
                audience: this.audience,
            });
            return data
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async validateToken(token: string) {
        try {
            this.checkToken(token)
            return true
        }
        catch (e) {
            return false
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user) {
            throw new UnauthorizedException('Email/senha erradas')
        }

        if(password != user.password) {
            throw new UnauthorizedException('Email/senha erradas')
        }

        return this.createToken(user)
    }
}
