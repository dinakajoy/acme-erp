import { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger';
import { verifyAccessToken } from '../utils/helpers';
import { isUser } from '../services/user.service';
import {
  InvalidException,
  NotFoundException,
  CustomException,
} from '../utils/errors';
import { IDecodedToken } from '../interfaces/token';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenExist = req.headers['authorization'];
  if (!tokenExist) {
    next(new (NotFoundException as any)());
  } else {
    try {
      const token = tokenExist.split(' ')[1];
      console.log('token', token);
      const decodedToken = await verifyAccessToken(
        { token, isRefreshToken: false },
        next
      );
      const userEmail = (decodedToken as IDecodedToken)?.payload?.email;
      const result = await isUser(userEmail, next);
      if (!result) {
        next(new (InvalidException as any)());
      }
      req.body.email = userEmail;
      next();
    } catch (error: any) {
      logger.error(error.message);
      next(new (CustomException as any)(403, 'Operation unsuccessful'));
    }
  }
};

export default isAuthenticated;
