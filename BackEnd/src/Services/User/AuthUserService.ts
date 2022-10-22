import prismaClient from '../../Prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({email, password}:AuthRequest){

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(!user) {
            throw new Error('Usuário ou senha inválidos')
        }

        //Comparando senha criptografada para ver se confere
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch){
            throw new Error('Usuário ou senha inválidos')
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            }, process.env.JS_TOKEN,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }