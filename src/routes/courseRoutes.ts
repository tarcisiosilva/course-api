import { Router } from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/courseController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/courses', authenticateToken, createCourse);
router.get('/courses', authenticateToken, getCourses);
router.get('/courses/:id', authenticateToken, getCourseById);
router.put('/courses/:id', authenticateToken, updateCourse);
router.delete('/courses/:id', authenticateToken, deleteCourse);

export default router;
