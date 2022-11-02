import { FormEvent, useContext, useState } from 'react'
import Head from "next/head"
import Image from "next/image"
import { Input } from "../components/ui/input"
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import { Button } from '../components/ui/button'
import Link from "next/link"
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {

  const { signIn } = useContext(AuthContext) //Importanto função signIn com useContext 
  const [email, setEmail] = useState('') //Use state para guardar o email
  const [password, setPassword] = useState('') //Use state para guardar a senha

  const [loading, setLoading] = useState(false) //Use state de carregamento

  async function HandleLogin(event: FormEvent) { //Função acionada ao enviar o form
    event.preventDefault();// comando para que o form não atualize a pagina ao ser enviado

    if( email === '' || password === ''){
      alert('Favor preencher todos os dados')
      return
    }

    setLoading(true)

    let data = { //Lista recebendo e-mail e senha
      email,
      password
    }
    await signIn(data) //Encaminhando os dados de data para signIn
    setLoading(false)
  }
  return (
    <>
    <Head>
      <title>Sujeito Pizza - Faça seu login</title>
    </Head>
    <div className={styles.conteinerCenter}>
      <Image src={logoImg} alt="Logo Sujeito Pizza"/>
      <div className={styles.login}>
        <form onSubmit={HandleLogin}>
          <Input placeholder="Digite seu e-mail" type='text' value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input placeholder="Digite sua senha" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={loading}>Acessar</Button>
        </form>
          <Link legacyBehavior href="/cadastro">
          <a className={styles.text}>Não pososui conta? Crie seu cadastro!</a>
        </Link>
      </div>
    </div>
    
    </>
  )
}
