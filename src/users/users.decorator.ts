import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

const logger: Logger = new Logger('CurrentUser');
export const UserParamsId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    logger.log(data);
    const req: Request = ctx.switchToHttp().getRequest();
    const id = req.params.id;
    return id;
  },
);
