import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';
import { JwtUser } from '../types/express';

interface DecodedToken {
  user: JwtUser;
}

export default function auth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return;
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, keys.jwtSecret) as DecodedToken;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
