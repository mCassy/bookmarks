import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { obj: 'Hello' };
  }
  signup() {
    return { obj: 'Hello' };
  }
}
