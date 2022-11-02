import Head from "next/head"
import Image from "next/image"
import { FormEvent, useContext, useState } from "react"
import { Input } from "../../components/ui/input"
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import { Button } from '../../components/ui/button'
import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContext"

export default function Cadastro() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { signUp } = useContext(AuthContext)

    async function handleSignUp(event: FormEvent){
        event.preventDefault();

        if(name === '' || email === '' || password === ''){
            alert('Favor preencher todos os dados')
            return;
        }

        setLoading(true)

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);

    }
    return (
        <>
            <Head>
                <title>Faça já seu cadastro!</title>
            </Head>
            <div className={styles.conteinerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizza" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input placeholder="Digite seu nome" type='text' value={name} onChange={(e)=>setName(e.target.value) }/>
                        <Input placeholder="Digite seu e-mail" type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input placeholder="Digite sua senha" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" loading={loading}>Cadastrar</Button>
                    </form>
                    <Link legacyBehavior href="/">
                        <a className={styles.text}>Já possui uma conta? Acesse agora!</a>
                    </Link>
                </div>
            </div>

        </>
    )
}
