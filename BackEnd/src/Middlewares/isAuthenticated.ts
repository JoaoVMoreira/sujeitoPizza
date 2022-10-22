import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string
}

//Função para verificação de usuário 
export function isAuthenticaded(req: Request, res: Response, next: NextFunction){
    const AuthToken = req.headers.authorization;

    //Informando Erro caso o token não seja capturado
    if(!AuthToken){
        return res.status(401).end();
    }

    const [, token] = AuthToken.split(" ") //Capturando token e excluindo script 

    try{
        const {sub} = verify(
            token, process.env.JS_TOKEN
        ) as PayLoad

        return next();
    }catch(err){
        return res.status(401).end(); 
    }

}