export interface JwtPayload {
  sub: string;
  email: string;
  'https://hasura.io/jwt/claims': HttpsHasuraIoJwtClaims;
  type: string;
  iat: number;
  exp: number;
}

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export interface HttpsHasuraIoJwtClaims {
  'x-hasura-allowed-roles': string[];
  'x-hasura-default-role': string;
  'x-hasura-tenent-id': string;
  'x-hasura-user-id': string;
  'x-hasura-weighbridge-id': string;
  'x-hasura-user-email': string;
}
