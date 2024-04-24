import { Injectable } from '@nestjs/common';
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
}
