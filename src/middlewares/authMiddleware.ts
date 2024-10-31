import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'meu_token';
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(403).json({ message: 'Token não fornecido' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
            res.status(403).json({ message: 'Token inválido' });
            return;
        }
        next(); // chama o próximo middleware se a autenticação for bem-sucedida
    });
};
