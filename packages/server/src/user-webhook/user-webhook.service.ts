import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class UserWebhookService {
  genPass() {
    return `${
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).toUpperCase().slice(2)
    }`;
  }
  async create(body: any) {
    const data = body.event.data.new;

    const user = await auth()
      .createUser({
        uid: data.id,
        email: data.email,
        password: this.genPass(),
        emailVerified: true,
      })
      .then(async (user) => {
        await auth().setCustomUserClaims(user.uid, {
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': [data.role],
            'x-hasura-default-role': data.role,
            'x-hasura-tenent-id': data.tenent_id,
            'x-hasura-user-id': data.id,
            'x-hasura-weighbridge-id': data.weighbridge_id,
          },
        });

        return user;
      })
      .catch(() => {
        throw new BadRequestException(
          'Forbidden',
          HttpStatus.BAD_REQUEST.toString(),
        );
      });
    return user;
  }

  async delete(body: any) {
    return await auth()
      .deleteUser(body.event.data.old.id)
      .then(() => {
        return {
          message: 'User deleted',
        };
      })
      .catch(() => {
        throw new BadRequestException(
          'Forbidden',
          HttpStatus.BAD_REQUEST.toString(),
        );
      });
  }

  async update(body: any) {
    try {
      const data = body.event.data.new;
      await auth().updateUser(data.id, {
        email: data.email,
      });

      return await auth()
        .setCustomUserClaims(data.id, {
          'x-hasura-weighbridge-id': {
            'x-hasura-allowed-roles': [data.role],
            'x-hasura-default-role': data.role,
            'x-hasura-tenent-id': data.tenent_id,
            'x-hasura-user-id': data.id,
            'x-hasura-weighbridge-id': data.weighbridge_id,
          },
        })
        .then(() => {
          return {
            message: 'User updated',
          };
        });
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }
  }
  async newAdmin(body: any) {
    const data = body.event.data.new;
    return await auth()
      .createUser({
        uid: data.id,
        password: this.genPass(),
        email: data.email,
        emailVerified: true,
      })
      .then(async (user) => {
        await auth().setCustomUserClaims(user.uid, {
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['admin'],
            'x-hasura-default-role': 'admin',
            'x-hasura-user-id': data.id,
          },
        });

        return {
          message: 'User created',
        };
      })
      .catch(() => {
        throw new BadRequestException(
          'error',
          HttpStatus.BAD_REQUEST.toString(),
        );
      });
  }
}
