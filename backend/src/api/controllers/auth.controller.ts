import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import {
  signAccessToken,
  verifyAccessToken,
  hashPassword,
  comparePassword,
} from '../utils/helpers';
import {
  IEmployeeWithoutPasswordAndRole,
  IEmployee,
} from '../interfaces/employee';
import {
  InvalidException,
  CustomException,
  UnauthorizedException,
} from '../utils/errors';
import mail from '../services/mail.service';
import { ICreateToken, IDecodedToken } from '../interfaces/token';
import logger from '../../config/logger';
import store from '../../config/sessionStore';

const prisma = new PrismaClient();

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user: IEmployee | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new (InvalidException as any)());
  }
  const isCorrectPassword = await comparePassword(
    password,
    user.password,
    next
  );
  if (!isCorrectPassword) {
    return next(new (InvalidException as any)());
  }
  if (password === 'Acme@2022') {
    return res.status(400).json({
      status: 'error',
      message: 'Please reset your password',
    });
  }
  const createAccessToken: ICreateToken = {
    employeeInfo: {
      email: user.email,
      role: user.role,
    },
    isRefreshToken: false,
  };
  const createRefreshToken: ICreateToken = {
    employeeInfo: {
      email: user.email,
      role: user.role,
    },
    isRefreshToken: true,
  };
  const result: IEmployeeWithoutPasswordAndRole = omit(user, [
    'password',
    'role',
  ]);
  const accessToken = await signAccessToken(createAccessToken, next);
  const refreshToken = await signAccessToken(createRefreshToken, next);
  req.session.isAuthenticated = refreshToken;
  return res.status(200).json({
    status: 'success',
    payload: result,
    token: accessToken
  });
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    // This is returned like this to prevent hackers from confirming unregistered emails
    return res.status(404).json({
      status: 'success',
      message: 'Please check your mail',
    });
  }
  const createToken: ICreateToken = {
    employeeInfo: {
      email: user.email,
      role: user.role,
    },
    isRefreshToken: false,
  };
  const accessToken = await signAccessToken(createToken, next);
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      resetPasswordToken: accessToken,
    },
  });
  const mailData = {
    from: process.env.SENDER_EMAIL || 'mymail@mail.com',
    to: user.email,
    subject: 'Account Update',
    html: `<b>Hey there! <br> This is the link to reset your password as requested <br/> ${
      process.env.UI_URL || 'http://localhost:3000'
    }/reset-password?token=${accessToken}`,
  };

  logger.info('mailData', mailData);
  const mailSent = await mail(mailData, next);
  logger.info('mailSent', mailSent);
  if (!mailSent) {
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
  return res.status(200).json({
    status: 'success',
    message: 'Please check your mail',
  });
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, token } = req.body;
    const decodedToken = (await verifyAccessToken(
      { token, isRefreshToken: false },
      next
    )) as IDecodedToken;
    if (decodedToken) {
      const email = decodedToken?.payload?.email;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || user.resetPasswordToken !== token) {
        return next(new (CustomException as any)(500, 'Invalid link used'));
      }

      const hashedPassword = await hashPassword(password, next);
      const updateUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
          resetPasswordToken: null
        },
      });
      if (updateUser !== null) {
        return res.status(200).json({
          status: 'success',
          message: 'Password updated successfully',
        });
      }
      return next(new (CustomException as any)(500, 'Operation unsuccessful'));
    }
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAuthenticated } = req.session;
  if (!isAuthenticated) return next(new (UnauthorizedException as any)());

  store.get(req.sessionID, async (err: any, foundUser: IEmployee) => {
    if (!foundUser) {
      return next(new (InvalidException as any)());
    }

    // evaluate jwt
    const decodedToken = await verifyAccessToken(
      { token: isAuthenticated, isRefreshToken: true },
      next
    );
    if (decodedToken) {
      decodedToken as IDecodedToken;
      const createAccessToken: ICreateToken = {
        employeeInfo: {
          email: (decodedToken as IDecodedToken)?.payload.email,
          role: (decodedToken as IDecodedToken)?.payload.role,
        },
        isRefreshToken: false,
      };
      const accessToken = await signAccessToken(createAccessToken, next);
      return res.status(200).json({
        status: 'success',
        payload: accessToken,
        message: 'Operation successful',
      });
    }
  });
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy(err => {
    if (err) {
      logger.error(err.message);
      return next(new (CustomException as any)(500, 'Operation unsuccessful'));
    }
    return res.status(200).json({
      status: 'success',
      message: 'Operation successful',
    });
  });
};
