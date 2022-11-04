import Head from "next/head"
import { ChangeEvent, FormEvent, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { Header } from "../../components/Header"
import { setupAPIClient } from "../../Services/setupAPIClient"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss'

type ItemProps = {
    id: string,
    name: string,
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Products({ categoryList }: CategoryProps){


    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

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

    function handleCategorySelected(e){
        setCategorySelected(e.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        try{
            const data = new FormData()
            if(name === '' || price === '' || description === '' || imageAvatar === ''){
                alert('Preencha todos os campos')
                return;
            }else{

                data.append('name', name);
                data.append('price', price);
                data.append('description', description);
                data.append('category_id', categories[categorySelected].id);
                data.append('file', imageAvatar);

                const apiClient = setupAPIClient();
                await apiClient.post('/product', data);

                alert('Produto cadastrado com sucesso')

                setName('')
                setPrice('')
                setDescription('')
                setAvatarUrl(null)
            }
        }catch(error){
            alert(error)
        }

        
    }

    return(
        <>
            <Head>Produtos - Sujeito Pizza</Head>
            <div>
                <Header/> 

                <main className={styles.conteiner}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color='#fsff'/>
                            </span>
                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {avatarUrl && (
                                <img className={styles.imagePreview} src={avatarUrl} alt="Foto do pedido" width={250} height={250} />
                            )}
                        </label> 

                        <select value={categorySelected} onChange={handleCategorySelected} >
                            {categories.map((item, index)=>{
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input type="text" placeholder="Insira o nome do produto" className={styles.input} value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type="text" placeholder="Insira o preço do produto" className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)} />
                        <textarea placeholder="Descreva o produto" className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} />
                        <button className={styles.buttonAdd} type='submit'>Cadastrar</button>
                    </form>
                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    
    const response = await apiClient.get('/category')


    return {
        props: {
            categoryList: response.data
        }
    }
})