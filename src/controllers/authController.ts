import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import { generateToken } from '../utils/jwtUtil';
import { validationResult } from 'express-validator';

const userRepository = AppDataSource.getRepository(User);

export const login = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Sempre retorne após enviar uma resposta para evitar erros de tipo
    }

    const { username, password } = req.body;

    try {
        const user = await userRepository.findOneBy({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Credenciais inválidas' });
            return;
        }

        const token = generateToken(user.id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


export const register = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Retorne após enviar a resposta para evitar erros de tipo
    }

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = userRepository.create({ username, password: hashedPassword });
        await userRepository.save(user);
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
};
