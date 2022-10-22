import { Router } from "express";
import { CreateUserController } from "./Controllers/Users/CreateUserControrller";
import { AuthUserController } from "./Controllers/Users/AuthUserController";
import { DetailUserController } from "./Controllers/Users/DetailUserController";
import { isAuthenticaded } from './Middlewares/isAuthenticated'

const router = Router();

router.post('/users', new CreateUserController().handel);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticaded, new DetailUserController().handle);

export { router };