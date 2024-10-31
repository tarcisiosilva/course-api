import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Course } from '../models/Course';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true, // Em produção, use migrações ao invés de synchronize
    entities: [
            User , Course
        ],
});
