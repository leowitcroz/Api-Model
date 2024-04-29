import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { log } from "console";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly auth: AuthService,private readonly user: UserService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers;

        try{
            const data = this.auth.checkToken((authorization ?? '').split(' ')[1])
            
            request.user = await this.user.showOne(data.id)

            return true
        }catch(e){
            return false
        }
    }

}