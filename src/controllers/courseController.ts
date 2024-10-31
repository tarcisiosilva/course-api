import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Course } from '../models/Course';

const courseRepository = AppDataSource.getRepository(Course);

export const createCourse = async (req: Request, res: Response): Promise<void> => {
    const { title, description, duration, instructor } = req.body;

    try {
        const course = courseRepository.create({ title, description, duration, instructor });
        await courseRepository.save(course);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o curso' });
    }
};

export const getCourses = async (req: Request, res: Response): Promise<void> => {
    const { title, instructor } = req.query;

    try {
        const query = courseRepository.createQueryBuilder('course');

        if (title) query.andWhere('course.title LIKE :title', { title: `%${title}%` });
        if (instructor) query.andWhere('course.instructor LIKE :instructor', { instructor: `%${instructor}%` });

        const courses = await query.getMany();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const course = await courseRepository.findOneBy({ id: parseInt(id, 10) });
        if (!course) {
            res.status(404).json({ message: 'Curso não encontrado' });
            return;
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o curso' });
    }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, duration, instructor } = req.body;

    try {
        const course = await courseRepository.findOneBy({ id: parseInt(id, 10) });
        if (!course) {
            res.status(404).json({ message: 'Curso não encontrado' });
            return;
        }

        course.title = title || course.title;
        course.description = description || course.description;
        course.duration = duration || course.duration;
        course.instructor = instructor || course.instructor;

        await courseRepository.save(course);
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o curso' });
    }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const course = await courseRepository.findOneBy({ id: parseInt(id, 10) });
        if (!course) {
            res.status(404).json({ message: 'Curso não encontrado' });
            return;
        }

        await courseRepository.remove(course);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o curso' });
    }
};
