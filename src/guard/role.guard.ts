import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "src/auth/auth.service";
import { ROLES_KEY } from "src/decorator/role.decorator";
import { Role } from "src/enum/role.enum";
import { UserService } from "src/user/user.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly auth: AuthService,private readonly user: UserService, private readonly reflector:Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if(!requiredRoles){
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        const rolesFilted = requiredRoles.filter(role => role == user.role)

        if (rolesFilted.length > 0) {
            return true
        }
        else {
            return false
        }

        
    }

}