import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { whiteList } from 'src/config/general.config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(ctx: ExecutionContext){
        const request = ctx.switchToHttp().getRequest();
        const path = request.route.path
        console.log({path});
        
        if(whiteList.includes(path)){
            Logger.warn('guard whitelisted path');
            return true;
        }
        return super.canActivate(ctx);
    }
}