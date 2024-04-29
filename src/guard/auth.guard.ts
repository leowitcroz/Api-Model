import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly auth: AuthService, user: UserService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers;

        try{
            this.auth.checkToken((authorization ?? '').split(' ')[1])

            return true
        }catch(e){
            return false
        }
    }

}