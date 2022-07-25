import { AuthGuard } from '@nestjs/passport';

export class WebHookGuard extends AuthGuard('headerapikey') {
  constructor() {
    super();
  }
}
