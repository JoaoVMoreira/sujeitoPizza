import prismaClient from "../../Prisma";

class ListOrdersService{
    async execute(){
        const order = await prismaClient.order.findMany({
            where:{
                status: false,
                draft: false
            },
            orderBy: { created_at: 'desc' }// Organizando pelos mais
        }) 
        return order
    }
}

export { ListOrdersService };