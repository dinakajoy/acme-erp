import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const loginValidation = () => [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 }),
];

export const forgetPasswordValidation = () => [
  body('email').trim().isEmail().normalizeEmail(),
];

export const resetPasswordValidation = () => [
  body('password').isLength({ min: 5 }).isStrongPassword().withMessage('Not a strong password'),
  body('token').isLength({ min: 10 }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    errors: errors.array(),
  });
};
