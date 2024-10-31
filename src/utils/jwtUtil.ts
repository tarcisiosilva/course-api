import jwt from 'jsonwebtoken';

const SECRET_KEY = 'meu_token';

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};
