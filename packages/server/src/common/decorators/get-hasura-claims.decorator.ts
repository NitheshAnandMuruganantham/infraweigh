import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpsHasuraIoJwtClaims, JwtPayload } from 'src/auth/types';

export const GetCurrentUserHasuraClaims = createParamDecorator(
  (_: undefined, context: ExecutionContext): HttpsHasuraIoJwtClaims => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user['https://hasura.io/jwt/claims'];
  },
);
