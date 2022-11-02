import { createContext, ReactNode, useState } from 'react';
import {destroyCookie, setCookie, parseCookies} from 'nookies';
import Router from 'next/router';
import { api } from '../Services/apiClient'

type AuthContextData = { //Criando tipagem
    user: UserProps; // Informações do usuário
    isAuthenticated: boolean; //Verificação se o usuário está authenticado
    signIn: (credenciais: SignInProps) => Promise<void>; //SignIn recebe uma função que recebe as credenciasi definidas (email e password) 
    signOut: () => void;
}

type UserProps = { //Dados de usuário' recebidos
    id: string;
    name: string;
    email: string
}

type SignInProps = { //Dados de login recebidos
    email: string;
    password: string
}

type AuthProviderProps = { //Setando o tipo do Children
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)//Setando tipagem no contexto

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/');
    }catch{
        console.log('error')
    }
}

export function AuthProvider({ children }: AuthProviderProps){ //Quem irá prover as informações 

    const [user, setUser] = useState<UserProps>() //Informando os dados da UseProps na useState do user
    const isAuthenticated = !!user; //Se user estiver vazio então isAuthenticated recebe false

    async function signIn({email, password}: SignInProps){ //A função recebe email e senha, com tipagem em SignInProps
        try{
            const response = await  api.post('/session', {
                email,
                password
            })

            //console.log(response.data)
            const { id, name, token } = response.data;
            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({
                id, 
                name,
                email
            })
           

           api.defaults.headers['authorization'] = `Bearer ${token}`

           Router.push('/dashboard')
        }catch(err){

        }
    }

    return(
    <AuthContext.Provider value={{ user,  isAuthenticated, signIn, signOut }}>
        {children}
    </AuthContext.Provider>
    )
}