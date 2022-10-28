import prismaClient from "../../Prisma";

interface DetailRequest{
    order_id: string;
}

class DetailOrderService{
    async execute({order_id}: DetailRequest){

        const orders = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{
                products: true,
                orders: true
            }
        })
        return orders

    }
}

export { DetailOrderService }