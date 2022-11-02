import Head from "next/head";
import styles from './styles.module.scss'
import { Header } from "../../components/Header";
import { FormEvent, useState } from 'react'
import { setupAPIClient } from "../../Services/setupAPIClient";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category(){

    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name 
        })

        alert('Categoria cadastrada com sucesso!')
        setName('')
    }
    return(
        <>
            <Head>
                <title>Nova Categoria - Sujeito Pizza</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.conteiner}>
                    <h1>Cadastrar categorias</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Digite uma categoria" className={styles.input}/>

                        <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                    </form>
                </main>                

            </div>
        </>
    )
}

export const getServiceSideProps = canSSRAuth(async (ctx)=>{

    return{
        props: {}
    }
})