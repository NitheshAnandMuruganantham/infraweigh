import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class CustomerWebhookService {
  genPass() {
    return `${
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).toUpperCase().slice(2)
    }`;
  }
  async create(body: any) {
    const data = body.event.data.new;
    return await auth()
      .getUserByEmail(data.email)
      .then((user) => {
        if (user.uid) {
          return { message: 'user exists' };
        }
      })
      .catch(() => {
        auth()
          .createUser({
            email: data.email,
            password: this.genPass(),
            emailVerified: true,
          })
          .then(async (user) => {
            await auth().setCustomUserClaims(user.uid, {
              'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['customer'],
                'x-hasura-default-role': 'customer',
                'x-hasura-email': data.email,
                'x-hasura-phone': data.phone,
              },
            });

            return {
              message: 'User created',
            };
          })
          .catch(() => {
            throw new InternalServerErrorException(
              'something went wrong',
              HttpStatus.INTERNAL_SERVER_ERROR.toString(),
            );
          });
      });
  }

  async update(body: any) {
    const data = body.event.data.new;

    return await auth()
      .getUserByEmail(data.email)
      .then(() => {
        return { message: 'user exists' };
      })
      .catch(() => {
        auth()
          .createUser({
            email: data.email,
            password: this.genPass(),
            emailVerified: true,
          })
          .then(async (user) => {
            await auth().setCustomUserClaims(user.uid, {
              'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['customer'],
                'x-hasura-default-role': 'customer',
                'x-hasura-email': data.email,
                'x-hasura-phone': data.phone,
              },
            });

            return {
              message: 'User created',
            };
          })
          .catch(() => {
            throw new InternalServerErrorException(
              'something went wrong',
              HttpStatus.INTERNAL_SERVER_ERROR.toString(),
            );
          });
      });
  }
}
