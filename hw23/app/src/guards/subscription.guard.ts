import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const email = req.headers['email'] as string;

    req['hasActiveSubscription'] = false;

    if (!email) return true;

    const user = await this.usersService.findByEmail(email);
    if (!user) return true;

    const now = new Date();
    const start = new Date(user.subscriptionStartDate);
    const end = new Date(user.subscriptionEndDate);

    req['hasActiveSubscription'] = start <= now && end >= now;

    return true;
  }
}
