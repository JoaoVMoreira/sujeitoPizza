import { Router } from "express";
import { CreateUserController } from "./Controllers/Users/CreateUserControrller";
import { AuthUserController } from "./Controllers/Users/AuthUserController";
import { DetailUserController } from "./Controllers/Users/DetailUserController";
import { isAuthenticaded } from './Middlewares/isAuthenticated'
import { CreateCategoryController } from './Controllers/Category/CreateCategoryController'
import { ListCategoryController } from './Controllers/Category/ListCategoryController'
import { CreateProductController } from './Controllers/Products/CreateProductController'
import { ListByCategoryController } from './Controllers/Products/ListByCategoryController'
import { CreateOrderController } from './Controllers/Order/CreateOrderController'
import { RemoveOrderController } from './Controllers/Order/RemoveOrderController';
import multer from 'multer'
import uploadConfig from './config/multer'

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

router.post('/users', new CreateUserController().handel);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticaded, new DetailUserController().handle);

//Category
router.post('/category', isAuthenticaded, new CreateCategoryController().handle);

router.get('/category', isAuthenticaded, new ListCategoryController().handle)

//Product

router.post('/product', isAuthenticaded, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticaded, new ListByCategoryController().handle)

//Order

router.post('/order', isAuthenticaded, new CreateOrderController().handle);
router.delete('/order', isAuthenticaded, new RemoveOrderController().handle);

export { router };