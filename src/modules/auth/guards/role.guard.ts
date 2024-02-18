import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as any;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles', roles);
    if (roles.includes(req.decodedData.role)) {
      return true;
    }

    return false;
  }
}
