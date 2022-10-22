import prismaClient from '../../Prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        //Verificar se o e-mail foi preenchido
        if(!email){
            throw new Error('Email incorreto')
        }

        //Verificar se o e-mail já existe
        const UserExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(UserExists){
            throw new Error('User já existe')
        }

        //Criptografando senha
        const passwordHash = await hash(password, 8)

        //Cadastrar user no banco de dados
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            }, select:{
                id: true,
                name: true,
                email: true
            }
        })
        return user
    }
}

export { CreateUserService }