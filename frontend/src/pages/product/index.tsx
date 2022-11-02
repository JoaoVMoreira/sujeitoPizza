import Head from "next/head"
import { ChangeEvent, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { Header } from "../../components/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss'

export default function Products(){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];

        if(!image){
            return;
        }

        if(image.type === 'imaage/png' || image.type === 'image/jpeg'){

            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    return(
        <>
            <Head>Produtos - Sujeito Pizza</Head>
            <div>
                <Header/> 

                <main className={styles.conteiner}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color='#fsff'/>
                            </span>
                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatarUrl && (
                                <img className={styles.imagePreview} src={avatarUrl} alt="Foto do pedido" width={250} height={250} />
                            )}
                        </label>

                        <select>
                            <option>Bebida</option>
                        </select>

                        <input type="text" placeholder="Insira o nome do produto" className={styles.input}/>
                        <input type="text" placeholder="Insira o preço do produto" className={styles.input} />
                        <textarea placeholder="Descreva o produto" className={styles.input} />
                        <button className={styles.buttonAdd} type='submit'>Cadastrar</button>
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