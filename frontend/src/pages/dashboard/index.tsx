import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"
import styles from "./styles.module.scss"
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "../../Services/setupAPIClient"
import { useState } from "react"
import Modal from 'react-modal';
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
    id: string,
    table: number,
    status: boolean,
    draft: boolean,
    name: string | null,
}

export type OrderItemProps = {
    id: string,
    amount: string,
    order_id: string,
    product_id: string,
    product: {
        id: string,
        name: string,
        description: string,
        price: string;
        banner: string,
    }
    order:{
        id:string;
        table: number,
        status: boolean,
        name: string | null,
    }
}

interface HomeProps{
    orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps){

    const [orderList, setOrderList] = useState(orders || [])

    const [modalItem, setModalItem] = useState <OrderItemProps[]>();
    const[modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string){
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        })

        setModalItem(response.data)
        setModalVisible(true)
    }
    Modal.setAppElement('#__next')

    return(
        <>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.conteiner}>
                    <div className={styles.conteinerHeader}>
                        <h1>Ultimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color='#3fffa3'/>
                        </button>
                    </div>

                <article className={styles.lists}>

                    {orderList.map( item => (
                        <section key={item.id} className={styles.orderItem}>
                            <button onClick={()=> handleOpenModalView(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}

                    


                </article>

                </main>

                { modalVisible && (
                    <ModalOrder/>
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/orders');

    console.log(response.data);

    return {
        props: {
            orders: response.data
        }
    }
})