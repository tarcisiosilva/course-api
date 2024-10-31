import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/db';
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import 'reflect-metadata';
import { error } from 'console';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', courseRoutes); 


AppDataSource.initialize()
    .then(() => {
        console.log('Data Source initialized!');
        if (process.env.NODE_ENV !== 'test') {
            app.listen(3000, () => console.log('Server running on port 3000'));
        }
    })
    .catch(error);

export default app;
