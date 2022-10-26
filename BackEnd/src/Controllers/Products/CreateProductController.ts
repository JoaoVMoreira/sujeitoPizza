import {Request, Response} from 'express';
import { CreateProductServer } from '../../Services/Products/CreateProductService';

class CreateProductController{
    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body
        const createProductServer = new CreateProductServer();

        if(!req.file){ //Caso a foto não tenha sido encaminhada
            throw new Error('Upload não realizado')
        }else{

            const {originalname, filename: banner}=req.file

            const product = await createProductServer.execute({
                name, price, description, banner, category_id
            });
            return res.json(product)
        }
    }
}

export { CreateProductController }