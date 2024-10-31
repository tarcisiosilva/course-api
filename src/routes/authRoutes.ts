import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { loginValidator, registerValidator } from '../validators/authValidator';

const router = Router();

router.post('/login', loginValidator, login );
router.post('/register', registerValidator, register );

export default router;
