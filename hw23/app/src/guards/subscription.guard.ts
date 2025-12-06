import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const email = req.headers['email'] as string;
    if (!email) {
      req['hasActiveSubscription'] = false;
      return true;
    }

    const user = this.usersService.findByEmail(email);
    if (!user) {
      req['hasActiveSubscription'] = false;
      return true;
    }

    const now = new Date();
    const isActive =
      new Date(user.subscriptionStartDate) <= now &&
      new Date(user.subscriptionEndDate) >= now;
    req['hasActiveSubscription'] = isActive;

    return true;
  }
}
