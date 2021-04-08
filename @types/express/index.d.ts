import { UserToken } from '../../src/interfaces';

declare global {
  namespace Express {
    interface Request {
      token: UserToken;
    }
  }
}
