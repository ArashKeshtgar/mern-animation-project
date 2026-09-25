import 'express';

export interface JwtUser {
  id: string;
  name: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
    }
  }
}
