import { body } from 'express-validator';

export const loginValidator = [
    body('username')
        .notEmpty()
        .withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3 })
        .withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
    body('password')
        .notEmpty()
        .withMessage('A senha é obrigatória.')
        .isLength({ min: 6 })
        .withMessage('A senha deve ter pelo menos 6 caracteres.'),
];

export const registerValidator = [
    body('username')
        .notEmpty()
        .withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3 })
        .withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
    body('password')
        .notEmpty()
        .withMessage('A senha é obrigatória.')
        .isLength({ min: 6 })
        .withMessage('A senha deve ter pelo menos 6 caracteres.'),
];
